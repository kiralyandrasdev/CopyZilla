using System.Net;
using System.Text;
using API.Tests.Database;
using API.Tests.Engine;
using API.Tests.Firebase;
using API.Tests.Stripe;
using CopyZillaBackend.Application.Common;
using CopyZillaBackend.Application.Features.User.Commands.CreateUserCommand;
using CopyZillaBackend.Application.Features.User.Commands.DeleteUserCommand;
using CopyZillaBackend.Application.Features.User.Commands.UpdateUserCommand;
using CopyZillaBackend.Application.Features.User.Queries.GetUserQuery;
using CopyZillaBackend.Domain.Entities;
using FirebaseAdmin.Auth;
using FluentAssertions;
using Newtonsoft.Json;
using Xunit.Priority;

namespace API.Tests.IntegrationTests
{
    [Collection("Serial")]
    [TestCaseOrderer(PriorityOrderer.Name, PriorityOrderer.Assembly)]
    public class UserTests : IClassFixture<WebApplicationFactoryEngine<Program>>, IAsyncLifetime
    {
        private readonly WebApplicationFactoryEngine<Program> _factory;
        private readonly HttpClient _client;
        private readonly PostgresDBManager _postgresDbManager;
        private readonly MongoDBManager _mongodbDbManager;
        private readonly StripeManager _stripeManager;
        private readonly FirebaseManager _firebaseManager;

        public UserTests(WebApplicationFactoryEngine<Program> factory)
        {
            _factory = factory;
            _client = _factory.CreateDefaultClient(new Uri("https://localhost:7107/api/"));
            _postgresDbManager = new PostgresDBManager(factory);
            _mongodbDbManager = new MongoDBManager(factory);
            _stripeManager = new StripeManager(factory);
            _firebaseManager = new FirebaseManager(factory);

            // clear on-prem db before tests
            _postgresDbManager.ClearSchema();
            _mongodbDbManager.ClearSchema();
        }
        
        public Task InitializeAsync() => Task.CompletedTask; 

        [Fact]
        public async Task Should_Create_User()
        {
            var userHint = Guid.NewGuid().ToString();
            var options = new CreateUserCommandOptions()
            {
                FirebaseUid = userHint,
                Email = $"{userHint}@test.com",
                FirstName = userHint,
                LastName = userHint,
            };

            var httpContent = new StringContent(JsonConvert.SerializeObject(options), Encoding.UTF8, "application/json");
            var response = await _client.PostAsync("/api/user", httpContent);

            var user = await _postgresDbManager.FindUserAsync(options.FirebaseUid);

            user.Should().NotBeNull();
            user!.StripeCustomerId.Should().NotBeNull();
            response.IsSuccessStatusCode.Should().BeTrue();

            var stripeCustomer = await _stripeManager.FindCustomerAsync(user!.StripeCustomerId!);

            options.Email.Should().BeEquivalentTo(stripeCustomer!.Email);

            await _stripeManager.DeleteCustomerAsync(user!.StripeCustomerId!);
        }

        [Fact]
        public async Task Should_Not_Create_User_With_Existing_FirebaseUid()
        {
            var userHint = Guid.NewGuid().ToString();
            var userEmail = $"{userHint}@test.com";

            var user = new User()
            {
                FirebaseUid = userHint,
                Email = userEmail,
                StripeCustomerId = userHint,
                SubscriptionValidUntil = DateTime.UtcNow,
            };

            await _postgresDbManager.AddUserAsync(user);

            var options = new CreateUserCommandOptions()
            {
                FirebaseUid = userHint,
                Email = userEmail,
                FirstName = userHint,
                LastName = userHint,
            };

            var httpContent = new StringContent(JsonConvert.SerializeObject(options), Encoding.UTF8, "application/json");
            var response = await _client.PostAsync("/api/user", httpContent);
            var responseBody = await response.Content.ReadAsStringAsync();

            var result = JsonConvert.DeserializeObject<CreateUserCommandResult>(responseBody);

            result.Should().NotBeNull();
            response.StatusCode.Should().Be(HttpStatusCode.BadRequest);
            result!.Success.Should().BeFalse();
            result.ErrorMessage.Should().NotBeEmpty();
        }

        [Fact]
        public async Task Should_Not_Create_User_With_Incorrect_Email()
        {
            var userHint = Guid.NewGuid().ToString();
            var options = new CreateUserCommandOptions()
            {
                FirebaseUid = userHint,
                Email = userHint,
                FirstName = userHint,
                LastName = userHint,
            };

            var httpContent = new StringContent(JsonConvert.SerializeObject(options), Encoding.UTF8, "application/json");
            var response = await _client.PostAsync("/api/user", httpContent);
            var responseBody = await response.Content.ReadAsStringAsync();

            var result = JsonConvert.DeserializeObject<CreateUserCommandResult>(responseBody);

            result.Should().NotBeNull();
            response.StatusCode.Should().Be(HttpStatusCode.BadRequest);
            result!.Success.Should().BeFalse();
            result.ErrorMessage.Should().NotBeEmpty();
        }

        [Fact]
        public async Task Should_Not_Create_User_With_Empty_FirebaseUid()
        {
            var userHint = Guid.NewGuid().ToString();
            var options = new CreateUserCommandOptions()
            {
                FirebaseUid = "",
                Email = userHint,
                FirstName = userHint,
                LastName = userHint,
            };

            var httpContent = new StringContent(JsonConvert.SerializeObject(options), Encoding.UTF8, "application/json");
            var response = await _client.PostAsync("/api/user", httpContent);
            var responseBody = await response.Content.ReadAsStringAsync();

            var result = JsonConvert.DeserializeObject<CreateUserCommandResult>(responseBody);

            result.Should().NotBeNull();
            response.StatusCode.Should().Be(HttpStatusCode.BadRequest);
            result!.Success.Should().BeFalse();
            result.ErrorMessage.Should().NotBeEmpty();
        }

        [Fact]
        public async Task Should_Not_Create_User_With_Empty_Email()
        {
            var userHint = Guid.NewGuid().ToString();
            var options = new CreateUserCommandOptions()
            {
                FirebaseUid = userHint,
                Email = "",
                FirstName = userHint,
                LastName = userHint,
            };

            var httpContent = new StringContent(JsonConvert.SerializeObject(options), Encoding.UTF8, "application/json");
            var response = await _client.PostAsync("/api/user", httpContent);
            var responseBody = await response.Content.ReadAsStringAsync();

            var result = JsonConvert.DeserializeObject<CreateUserCommandResult>(responseBody);

            result.Should().NotBeNull();
            response.StatusCode.Should().Be(HttpStatusCode.BadRequest);
            result!.Success.Should().BeFalse();
            result.ErrorMessage.Should().NotBeEmpty();
        }

        [Fact]
        public async Task Should_Get_User()
        {
            // arrange 
            var userHint = Guid.NewGuid().ToString();
            var userEmail = $"{userHint}@test.com";
            var products = await _stripeManager.ListProductsAsync();

            var user = new User()
            {
                Email = userEmail,
                StripeCustomerId = userHint,
                FirebaseUid = userHint,
                SubscriptionValidUntil = DateTime.UtcNow,
                ProductId = products.FirstOrDefault(p => p.Metadata[nameof(StripeProductMetadata.plan_type)] == "default").Id,
            };

            await _postgresDbManager.AddUserAsync(user);

            // act
            var response = await _client.GetAsync($"/api/user/{user.FirebaseUid}");
            var responseBody = await response.Content.ReadAsStringAsync();

            var result = JsonConvert.DeserializeObject<GetUserQueryResult>(responseBody);

            // assert
            result.Should().NotBeNull();
            result!.Value.Should().NotBeNull();
            response.StatusCode.Should().Be(HttpStatusCode.OK);
            result.Value!.Email.Should().Be(user.Email);
            result.Value!.FirebaseUid.Should().Be(user.FirebaseUid);
        }

        [Fact]
        public async Task Should_Not_Get_User()
        {
            // arrange
            var userHint = Guid.NewGuid().ToString();
            var userEmail = $"{userHint}@test.com";
            var user = new User()
            {
                Email = userEmail,
                StripeCustomerId = userHint,
                FirebaseUid = userHint,
                SubscriptionValidUntil = DateTime.UtcNow,
            };

            await _postgresDbManager.AddUserAsync(user);

            // act
            var response = await _client.GetAsync($"/api/user/{user.Id}");
            var responseBody = await response.Content.ReadAsStringAsync();

            var result = JsonConvert.DeserializeObject<GetUserQueryResult>(responseBody);

            // assert
            result.Should().NotBeNull();
            result!.Value.Should().BeNull();
            result.ErrorMessage.Should().NotBeNullOrEmpty();
            response.StatusCode.Should().Be(HttpStatusCode.NotFound);
        }

        [Fact]
        public async Task Should_Update_User()
        {
            var userHint = Guid.NewGuid().ToString();
            var userEmail = $"{userHint}@test.com";
            var customer = await _stripeManager.CreateCustomerAsync(userEmail);

            var user = new User()
            {
                Email = userEmail,
                StripeCustomerId = customer.Id,
                SubscriptionValidUntil = DateTime.UtcNow,
            };

            var firebaseUser = await _firebaseManager.CreateFirebaseUserAsync(user);
            user.FirebaseUid= firebaseUser.Uid;

            var dbUser = await _postgresDbManager.AddUserAsync(user);
            user.Id = dbUser!.Id;

            var options = new UpdateUserCommandOptions()
            {
                Email = $"{userHint}@modified.com",
                FirstName = userHint + "modified",
                LastName = userHint + "modified",
            };

            var httpContent = new StringContent(JsonConvert.SerializeObject(options), Encoding.UTF8, "application/json");
            var response = await _client.PatchAsync($"/api/user/{user.Id}", httpContent);
            var responseBody = await response.Content.ReadAsStringAsync();

            var result = JsonConvert.DeserializeObject<UpdateUserCommandResult>(responseBody);

            result.Should().NotBeNull();
            response.StatusCode.Should().Be(HttpStatusCode.OK);

            var updatedUser = await _postgresDbManager.FindUserAsync(dbUser.FirebaseUid);
            var updatedCustomer = await _stripeManager.FindCustomerAsync(user.StripeCustomerId);
            var updatedFirebaseUser = await _firebaseManager.GetUserAsync(user.FirebaseUid);

            result!.Success.Should().BeTrue();
            updatedUser.Should().NotBeNull();
            updatedCustomer.Should().NotBeNull();
            updatedFirebaseUser.Should().NotBeNull();
            updatedUser!.StripeCustomerId.Should().BeEquivalentTo(customer.Id);
            updatedUser!.FirebaseUid.Should().BeEquivalentTo(user.FirebaseUid);
            updatedUser!.Email.Should().BeEquivalentTo(options.Email);
            updatedCustomer!.Email.Should().BeEquivalentTo(options.Email);
            updatedFirebaseUser!.Email.Should().BeEquivalentTo(options.Email);
        }

        [Fact]
        public async Task Should_Delete_User()
        {
            // arrange
            var userHint = Guid.NewGuid().ToString();
            var userEmail = $"{userHint}@test.com";

            var customer = await _stripeManager.CreateCustomerAsync(userEmail);

            var user = new User()
            {
                Email = userEmail,
                StripeCustomerId = customer.Id,
                SubscriptionValidUntil = DateTime.UtcNow,
            };

            var firebaseUser = await _firebaseManager.CreateFirebaseUserAsync(user);
            user.FirebaseUid = firebaseUser.Uid;

            var dbUser = await _postgresDbManager.AddUserAsync(user);
            user.Id = dbUser!.Id;

            // act
            var response = await _client.DeleteAsync($"/api/user/{user.Id}");
            var responseBody = await response.Content.ReadAsStringAsync();
            var result = JsonConvert.DeserializeObject<DeleteUserCommandResult>(responseBody);

            var deletedCustomer = await _stripeManager.FindCustomerAsync(customer.Id);
            var deleteFirebaseUser = async () => { await _firebaseManager.DeleteUserAsync(user.FirebaseUid); };
            var deletedUser = await _postgresDbManager.FindUserAsync(user.FirebaseUid);

            // assert
            result.Should().NotBeNull();
            response.StatusCode.Should().Be(HttpStatusCode.OK);
            deletedCustomer.Deleted.Should().BeTrue();
            deletedUser.Should().BeNull();
            await deleteFirebaseUser.Should().ThrowAsync<FirebaseAuthException>();
        }
        
        public async Task DisposeAsync()
        {
            // clear stripe and firebase after tests
            var customers = await _stripeManager.ListCustomersAsync();
            var users = await _firebaseManager.ListUsersAsync();

            var testCustomers = customers.Where(c => Guid.TryParse(c.Email.Split('@')[0], out _));
            var testUsers = users.Where(u => Guid.TryParse(u.Email.Split('@')[0], out _));

            foreach (var customer in testCustomers)
            {
                await _stripeManager.DeleteCustomerAsync(customer.Id);
            }

            foreach (var user in testUsers)
            {
                await _firebaseManager.DeleteUserAsync(user.Uid);
            }
        }
    }
}