using API.Tests.Database;
using API.Tests.Engine;
using API.Tests.Firebase;
using API.Tests.Stripe;
using CopyZillaBackend.Application.Common;
using CopyZillaBackend.Application.Error;
using CopyZillaBackend.Application.Features.Prompt.ProcessEmailPromptEvent;
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
    public class PromptTests : IClassFixture<WebApplicationFactoryEngine<Program>>, IAsyncLifetime
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
        
        public Task InitializeAsync() => Task.CompletedTask;

        [Fact]
        public async Task Should_Generate_Email_Prompt()
        {
            // arrange
            var userHint = Guid.NewGuid().ToString();
            var userEmail = $"{userHint}@test.com";
            var products = await _stripeManager.ListProductsAsync();
            var defaultProduct = products.FirstOrDefault(p => p.Metadata[nameof(StripeProductMetadata.plan_type)] == "default");

            var user = new User()
            {
                FirebaseUid = userHint,
                Email = userEmail,
                StripeCustomerId = userHint,
                SubscriptionValidUntil = DateTime.UtcNow,
                ProductId = defaultProduct!.Id,
                SubscriptionStatus = "active"
            };

            await _postgresDbManager.AddUserAsync(user);

            var options = new ProcessEmailPromptEventOptions()
            {
                Email = "Hi Daniel, how are you? Andras",
                Objective = "yes",
                Tone = "excited"
            };

            // act
            var httpContent = new StringContent(JsonConvert.SerializeObject(options), Encoding.UTF8, "application/json");
            var response = await _client.PostAsync($"/api/user/{user.Id}/emailPrompt", httpContent);
            var responseBody = await response.Content.ReadAsStringAsync();
            var result = JsonConvert.DeserializeObject<ProcessEmailPromptEventResult>(responseBody);

            var dbUser = await _postgresDbManager.FindUserAsync(user.FirebaseUid);
            var creditUsage = await _postgresDbManager.GetUserCreditUsageAsync(user.Id);
            
            // assert
            result.Should().NotBeNull();
            result!.Value.Should().NotBeNullOrEmpty();
            response.StatusCode.Should().Be(HttpStatusCode.OK);
            creditUsage.Should().Be(1);
        }

        [Fact]
        public async Task Should_Not_Generate_Email_Prompt_Usage_Limit_Reached()
        {
            // arrange
            var userHint = Guid.NewGuid().ToString();
            var userEmail = $"{userHint}@test.com";
            var products = await _stripeManager.ListProductsAsync();
            var product = products.FirstOrDefault(p => p.Metadata[nameof(StripeProductMetadata.plan_type)] == "default");
            var creditLimit = int.Parse(product!.Metadata[nameof(StripeProductMetadata.credit_limit)]);

            var user = new User()
            {
                FirebaseUid = userHint,
                Email = userEmail,
                StripeCustomerId = userHint,
                SubscriptionValidUntil = DateTime.UtcNow,
                ProductId = product.Id,
                SubscriptionStatus = "active"
            };

            await _postgresDbManager.AddUserAsync(user);

            await _postgresDbManager.AddUserCreditUsageAsync(user.Id, creditLimit);

            var options = new ProcessEmailPromptEventOptions()
            {
                Email = "Hi Daniel, how are you? Andras",
                Objective = "yes",
                Tone = "excited"
            };

            // act
            var httpContent = new StringContent(JsonConvert.SerializeObject(options), Encoding.UTF8, "application/json");
            var response = await _client.PostAsync($"/api/user/{user.Id}/emailPrompt", httpContent);
            var responseBody = await response.Content.ReadAsStringAsync();
            var result = JsonConvert.DeserializeObject<ProcessEmailPromptEventResult>(responseBody);

            // assert
            response.StatusCode.Should().Be(HttpStatusCode.BadRequest);
            result.Should().NotBeNull();
            result!.Value.Should().BeNullOrEmpty();
            result.ErrorMessage.Should().Be(ErrorMessages.UsageLimitReached);
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
