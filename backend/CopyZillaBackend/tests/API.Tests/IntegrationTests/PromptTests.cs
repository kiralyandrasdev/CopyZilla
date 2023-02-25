using API.Tests.Database;
using API.Tests.Engine;
using API.Tests.Firebase;
using API.Tests.Stripe;
using CopyZillaBackend.Application.Events.ProcessAdvancedPromptEvent;
using CopyZillaBackend.Application.Events.ProcessQuickPromptEvent;
using CopyZillaBackend.Application.Features.Prompt.ProcessAdvancedPromptEvent;
using CopyZillaBackend.Application.Features.Prompt.ProcessEmailPromptEvent;
using CopyZillaBackend.Application.Features.Prompt.ProcessQuickPromptEvent;
using CopyZillaBackend.Application.Features.User.Commands.DeletePromptResultCommand;
using CopyZillaBackend.Application.Features.User.Commands.SavePromptResultCommand;
using CopyZillaBackend.Application.Features.User.Queries.GetSavedPromptResultListQuery;
using CopyZillaBackend.Domain.Entities;
using FluentAssertions;
using Newtonsoft.Json;
using System.Net;
using System.Text;
using Xunit.Priority;

namespace API.Tests.IntegrationTests
{
    [Collection("Serial")]
    [TestCaseOrderer(PriorityOrderer.Name, PriorityOrderer.Assembly)]
    public class PromptTests : IClassFixture<WebApplicationFactoryEngine<Program>>, IDisposable
    {
        private readonly WebApplicationFactoryEngine<Program> _factory;
        private readonly HttpClient _client;
        private readonly PostgresDBManager _postgresDbManager;
        private readonly MongoDBManager _mongodbDbManager;
        private readonly StripeManager _stripeManager;
        private readonly FirebaseManager _firebaseManager;

        public PromptTests(WebApplicationFactoryEngine<Program> factory)
        {
            _factory = factory;
            _client = factory.CreateDefaultClient(new Uri("https://localhost:7107/api/"));
            _postgresDbManager = new PostgresDBManager(factory);
            _mongodbDbManager = new MongoDBManager(factory);
            _stripeManager = new StripeManager(factory);
            _firebaseManager = new FirebaseManager(factory);

            // clear on-prem db before tests
            _postgresDbManager.ClearSchema();
            _mongodbDbManager.ClearSchema();
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
                Title = userHint,
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

            var promptResult = new PromptResult()
            {
                Id = Guid.NewGuid(),
                UserId = Guid.Parse(userHint),
                Title = userHint,
                Content = "test"
            };

            await _mongodbDbManager.AddPromptResultAsync(promptResult);

            var promptResults = await _mongodbDbManager.GetPromptResultListAsync(user.Id);

            // act
            var response = await _client.GetAsync($"/api/user/{user.Id}/promptResults");
            var responseBody = await response.Content.ReadAsStringAsync();
            var result = JsonConvert.DeserializeObject<GetSavedPromptResultListQueryResult>(responseBody);

            // assert
            result.Should().NotBeNull();
            response.StatusCode.Should().Be(HttpStatusCode.OK);
            result.Value.Count.Should().Be(promptResults.Count);
            result.Value.Should().BeEquivalentTo(promptResults);
        }

        [Fact]
        public async Task Should_Delete_Prompt_Result()
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

            var promptResult = new PromptResult()
            {
                Id = Guid.NewGuid(),
                UserId = Guid.Parse(userHint),
                Title = userHint,
                Content = "test"
            };

            await _mongodbDbManager.AddPromptResultAsync(promptResult);

            // act
            var response = await _client.DeleteAsync($"/api/user/{user.Id}/promptResults/{promptResult.Id}");
            var responseBody = await response.Content.ReadAsStringAsync();
            var result = JsonConvert.DeserializeObject<DeletePromptResultCommandResult>(responseBody);

            var promptResults = await _mongodbDbManager.GetPromptResultListAsync(user.Id);

            // assert
            result.Should().NotBeNull();
            response.StatusCode.Should().Be(HttpStatusCode.OK);
            promptResults.Count.Should().Be(0);
        }

        [Fact]
        public async Task Should_Generate_Quick_Prompt()
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
                CreditCount = 10,
            };
            await _postgresDbManager.AddUserAsync(user);

            var options = new ProcessQuickPromptOptions()
            {
                Category = "essay",
                Language = "en",
                Style = "formal",
                Subject = "cats"
            };

            // act
            var httpContent = new StringContent(JsonConvert.SerializeObject(options), Encoding.UTF8, "application/json");
            var response = await _client.PostAsync($"/api/user/{user.FirebaseUid}/quickPrompt", httpContent);
            var responseBody = await response.Content.ReadAsStringAsync();
            var result = JsonConvert.DeserializeObject<ProcessQuickPromptEventResult>(responseBody);

            var dbUser = await _postgresDbManager.FindUserAsync(user.FirebaseUid);

            // assert
            result.Should().NotBeNull();
            result!.Value.Should().NotBeNullOrEmpty();
            response.StatusCode.Should().Be(HttpStatusCode.OK);
            dbUser!.CreditCount.Should().Be(9);
        }

        [Fact]
        public async Task Should_Generate_Advanced_Prompt()
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
                CreditCount = 10,
            };

            await _postgresDbManager.AddUserAsync(user);

            var options = new ProcessAdvancedPromptOptions()
            {
                Language = "en",
                Prompt = "dogs"
            };

            // act
            var httpContent = new StringContent(JsonConvert.SerializeObject(options), Encoding.UTF8, "application/json");
            var response = await _client.PostAsync($"/api/user/{user.FirebaseUid}/advancedPrompt", httpContent);
            var responseBody = await response.Content.ReadAsStringAsync();
            var result = JsonConvert.DeserializeObject<ProcessAdvancedPromptEventResult>(responseBody);

            var dbUser = await _postgresDbManager.FindUserAsync(user.FirebaseUid);

            // assert
            result.Should().NotBeNull();
            result!.Value.Should().NotBeNullOrEmpty();
            response.StatusCode.Should().Be(HttpStatusCode.OK);
            dbUser!.CreditCount.Should().Be(9);
        }

        [Fact]
        public async Task Should_Generate_Email_Prompt()
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
                CreditCount = 10,
            };
            await _postgresDbManager.AddUserAsync(user);

            var options = new ProcessEmailPromptOptions()
            {
                Email = "Hi Daniel, how are you? Andras",
                Objective = "yes",
                Tone = "excited"
            };

            // act
            var httpContent = new StringContent(JsonConvert.SerializeObject(options), Encoding.UTF8, "application/json");
            var response = await _client.PostAsync($"/api/user/{user.FirebaseUid}/emailPrompt", httpContent);
            var responseBody = await response.Content.ReadAsStringAsync();
            var result = JsonConvert.DeserializeObject<ProcessEmailPromptEventResult>(responseBody);

            var dbUser = await _postgresDbManager.FindUserAsync(user.FirebaseUid);

            // assert
            result.Should().NotBeNull();
            result!.Value.Should().NotBeNullOrEmpty();
            response.StatusCode.Should().Be(HttpStatusCode.OK);
            dbUser!.CreditCount.Should().Be(9);
        }

        [Fact]
        public async Task Should_Not_Generate_Email_Prompt()
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
                CreditCount = 0,
            };

            await _postgresDbManager.AddUserAsync(user);

            var options = new ProcessEmailPromptOptions()
            {
                Email = "Hi Daniel, how are you? Andras",
                Objective = "yes",
                Tone = "excited"
            };

            // act
            var httpContent = new StringContent(JsonConvert.SerializeObject(options), Encoding.UTF8, "application/json");
            var response = await _client.PostAsync($"/api/user/{user.FirebaseUid}/emailPrompt", httpContent);
            var responseBody = await response.Content.ReadAsStringAsync();
            var result = JsonConvert.DeserializeObject<ProcessEmailPromptEventResult>(responseBody);

            // assert
            result.Should().NotBeNull();
            result!.Value.Should().BeNullOrEmpty();
            result.ErrorMessage.Should().NotBeNullOrEmpty();
            response.StatusCode.Should().Be(HttpStatusCode.BadRequest);
        }

        public void Dispose()
        {
            // clear stripe and firebase after tests
            var customers = _stripeManager.ListCustomersAsync().GetAwaiter().GetResult();
            var users = _firebaseManager.ListUsersAsync().GetAwaiter().GetResult();

            var testCustomers = customers.Where(c => Guid.TryParse(c.Email.Split('@')[0], out _));
            var testUsers = users.Where(u => Guid.TryParse(u.Email.Split('@')[0], out _));

            foreach (var customer in testCustomers)
            {
                _stripeManager.DeleteCustomerAsync(customer.Id).GetAwaiter().GetResult();
            }

            foreach (var user in testUsers)
            {
                _firebaseManager.DeleteUserAsync(user.Uid).GetAwaiter().GetResult();
            }
        }
    }
}
