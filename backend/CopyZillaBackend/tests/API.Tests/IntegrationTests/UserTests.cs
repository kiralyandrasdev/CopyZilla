using System.Net;
using System.Text;
using API.Tests.Database;
using API.Tests.Engine;
using API.Tests.Stripe;
using CopyZillaBackend.Application.Features.User.Commands.CreateUserCommand;
using CopyZillaBackend.Application.Features.User.Commands.DeleteUserCommand;
using CopyZillaBackend.Application.Features.User.Commands.SavePromptResultCommand;
using CopyZillaBackend.Application.Features.User.Commands.UpdateUserCommand;
using CopyZillaBackend.Domain.Entities;
using FluentAssertions;
using Newtonsoft.Json;

namespace API.Tests.IntegrationTests
{
    public class UserTests : IClassFixture<WebApplicationFactoryEngine<Program>>
    {
        private readonly WebApplicationFactoryEngine<Program> _factory;
        private readonly HttpClient _client;
        private readonly PostgresDBManager _postgresDbManager;
        private readonly MongoDBManager _mongodbDbManager;
        private readonly StripeManager _stripeManager;

        public UserTests(WebApplicationFactoryEngine<Program> factory)
        {
            _factory = factory;
            _client = factory.CreateDefaultClient(new Uri("https://localhost:7107/api/"));
            _postgresDbManager = new PostgresDBManager(factory);
            _mongodbDbManager = new MongoDBManager(factory);
            _stripeManager = new StripeManager(factory);

            _postgresDbManager.ClearSchema();
            _mongodbDbManager.ClearSchema();
        }

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
                FirstName = userHint,
                LastName = userHint,
                StripeCustomerId = userHint,
                SubscriptionPlanName = userHint,
                SubscriptionValidUntil = DateTime.UtcNow,
                PlanType = "default",
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
        public async Task Should_Update_User()
        {
            var userHint = Guid.NewGuid().ToString();
            var userEmail = $"{userHint}@test.com";
            var customer = await _stripeManager.CreateCustomerAsync(userEmail);

            var user = new User()
            {
                FirebaseUid = userHint,
                Email = userEmail,
                FirstName = userHint,
                LastName = userHint,
                StripeCustomerId = customer.Id,
                SubscriptionPlanName = userHint,
                SubscriptionValidUntil = DateTime.UtcNow,
                PlanType = "default",
            };

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

            var updatedUser = await _postgresDbManager.FindUserAsync(userHint);

            updatedUser.Should().NotBeNull();
            updatedUser!.StripeCustomerId.Should().BeEquivalentTo(customer.Id);
            result!.Success.Should().BeTrue();
            user.FirebaseUid.Should().BeEquivalentTo(updatedUser!.FirebaseUid);
            options.Email.Should().BeEquivalentTo(updatedUser!.Email);
            options.FirstName.Should().BeEquivalentTo(updatedUser!.FirstName);
            options.LastName.Should().BeEquivalentTo(updatedUser!.LastName);

            var updatedCustomer = await _stripeManager.FindCustomerAsync(user.StripeCustomerId);

            customer.Should().NotBeNull();
            options.Email.Should().BeEquivalentTo(updatedCustomer!.Email);

            await _stripeManager.DeleteCustomerAsync(customer.Id);
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
                FirebaseUid = userHint,
                Email = userEmail,
                FirstName = userHint,
                LastName = userHint,
                StripeCustomerId = customer.Id,
                SubscriptionPlanName = userHint,
                SubscriptionValidUntil = DateTime.UtcNow,
                PlanType = "default",
            };

            var dbUser = await _postgresDbManager.AddUserAsync(user);
            user.Id = dbUser!.Id;

            // act
            var response = await _client.DeleteAsync($"/api/user/{user.Id}");
            var responseBody = await response.Content.ReadAsStringAsync();
            var result = JsonConvert.DeserializeObject<DeleteUserCommandResult>(responseBody);

            var deletedCustomer = await _stripeManager.FindCustomerAsync(customer.Id);
            var deletedUser = await _postgresDbManager.FindUserAsync(user.FirebaseUid);

            // assert
            result.Should().NotBeNull();
            response.StatusCode.Should().Be(HttpStatusCode.OK);
            deletedCustomer.Deleted.Should().BeTrue();
            deletedUser.Should().BeNull();
        }

        [Fact]
        public async Task Should_Save_Prompt_Result()
        {
            // arrange
            var userHint = Guid.NewGuid().ToString();
            var userEmail = $"{userHint}@test.com";

            var user = new User()
            {
                FirebaseUid = userHint,
                Email = userEmail,
                FirstName = userHint,
                LastName = userHint,
                StripeCustomerId = userHint,
                SubscriptionPlanName = userHint,
                SubscriptionValidUntil = DateTime.UtcNow,
                PlanType = "default",
            };

            var dbUser = await _postgresDbManager.AddUserAsync(user);
            user.Id = dbUser!.Id;

            var options = new SavePromptResultCommandOptions()
            {
                 Title= userHint,
                 Content = "test",
            };

            // act
            var httpContent = new StringContent(JsonConvert.SerializeObject(options), Encoding.UTF8, "application/json");
            var response = await _client.PostAsync($"/api/user/{user.Id}/promptResults", httpContent);
            var responseBody = await response.Content.ReadAsStringAsync();
            var result = JsonConvert.DeserializeObject<SavePromptResultCommandResult>(responseBody);

            var promptResults = await _mongodbDbManager.GetPromptResultListAsync(user.Id);

            // assert
            result.Should().NotBeNull();
            response.StatusCode.Should().Be(HttpStatusCode.OK);
            promptResults.Should().HaveCount(1);
            promptResults.FirstOrDefault()!.UserId.Should().Be(user.Id);
            promptResults.FirstOrDefault()!.Title.Should().Be(options.Title);
            promptResults.FirstOrDefault()!.Content.Should().Be(options.Content);
        }

        [Fact]
        public async Task Should_Not_Save_Prompt_Result_With_Empty_Content()
        {
            // arrange
            var userHint = Guid.NewGuid().ToString();
            var userEmail = $"{userHint}@test.com";

            var user = new User()
            {
                FirebaseUid = userHint,
                Email = userEmail,
                FirstName = userHint,
                LastName = userHint,
                StripeCustomerId = userHint,
                SubscriptionPlanName = userHint,
                SubscriptionValidUntil = DateTime.UtcNow,
                PlanType = "default",
            };

            var dbUser = await _postgresDbManager.AddUserAsync(user);
            user.Id = dbUser!.Id;

            var options = new SavePromptResultCommandOptions()
            {
                Title = userHint,
                Content = "",
            };

            // act
            var httpContent = new StringContent(JsonConvert.SerializeObject(options), Encoding.UTF8, "application/json");
            var response = await _client.PostAsync($"/api/user/{user.Id}/promptResults", httpContent);
            var responseBody = await response.Content.ReadAsStringAsync();
            var result = JsonConvert.DeserializeObject<SavePromptResultCommandResult>(responseBody);

            var promptResults = await _mongodbDbManager.GetPromptResultListAsync(user.Id);

            // assert
            result.Should().NotBeNull();
            promptResults.Count.Should().Be(0);
            response.StatusCode.Should().Be(HttpStatusCode.BadRequest);
            result!.Success.Should().BeFalse();
            result.ErrorMessage.Should().NotBeEmpty();
        }

        [Fact]
        public async Task Should_Get_Saved_Prompt_Results()
        {
            
        }

        [Fact]
        public async Task Should_Delete_Prompt_Result()
        {

        }
    }
}