using API.Tests.Database;
using API.Tests.Engine;
using API.Tests.Firebase;
using API.Tests.Stripe;
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
        public async Task Should_Generate_Email_Prompt()
        {
            // arrange
            var userHint = Guid.NewGuid().ToString();
            var userEmail = $"{userHint}@test.com";
            var product = await _stripeManager.ListProductsAsync();

            var user = new User()
            {
                FirebaseUid = userHint,
                Email = userEmail,
                StripeCustomerId = userHint,
                SubscriptionValidUntil = DateTime.UtcNow,
                ProductId = product.First().Id,
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
