using System.Net;
using System.Text;
using API.Tests.Database;
using API.Tests.Engine;
using API.Tests.Stripe;
using CopyZillaBackend.Application.Features.User.Commands.CreateUserCommand;
using CopyZillaBackend.Domain.Entities;
using Newtonsoft.Json;

namespace API.Tests.IntegrationTests
{
    public class UserTests : IClassFixture<WebApplicationFactoryEngine<Program>>
    {
        private readonly WebApplicationFactoryEngine<Program> _factory;
        private readonly HttpClient _client;
        private readonly DatabaseManager _databaseManager;
        private readonly StripeManager _stripeManager;

        public UserTests(WebApplicationFactoryEngine<Program> factory)
        {
            _factory = factory;
            _client = factory.CreateDefaultClient(new Uri("https://localhost:7107/api/"));
            _databaseManager = new DatabaseManager(factory);
            _stripeManager = new StripeManager(factory);

            _databaseManager.ClearSchema();
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
            var responseBody = await response.Content.ReadAsStringAsync();

            var result = JsonConvert.DeserializeObject<CreateUserCommandResult>(responseBody);
            var user = await _databaseManager.FindUserAsync(options.FirebaseUid);

            Assert.NotNull(user);
            Assert.NotNull(user!.StripeCustomerId);
            Assert.NotNull(result);
            Assert.True(response.IsSuccessStatusCode);

            var stripeCustomer = await _stripeManager.FindCustomerAsync(user!.StripeCustomerId!);

            Assert.Equal(options.Email, stripeCustomer!.Email);

            await _stripeManager.DeleteCustomerAsync(user!.StripeCustomerId!);
        }

        [Fact]
        public async Task Should_Not_Create_User_With_Existing_FirebaseUid()
        {
            var userHint = Guid.NewGuid().ToString();
            var userEmail = $"{userHint}@test.com";

            var user = new User()
            {
                FirebaseUId = userHint,
                Email = userEmail,
                FirstName = userHint,
                LastName = userHint,
                StripeCustomerId = userHint,
                SubscriptionPlanName = userHint,
                SubscriptionValidUntil = DateTime.UtcNow,
                CreditCount = 20,
            };

            await _databaseManager.AddUserAsync(user);

            var options = new CreateUserCommandOptions()
            {
                FirebaseUid = userHint,
                Email = $"{userHint}@test.com",
                FirstName = userHint,
                LastName = userHint,
            };

            var httpContent = new StringContent(JsonConvert.SerializeObject(options), Encoding.UTF8, "application/json");
            var response = await _client.PostAsync("/api/user", httpContent);
            var responseBody = await response.Content.ReadAsStringAsync();

            var result = JsonConvert.DeserializeObject<CreateUserCommandResult>(responseBody);

            Assert.NotNull(result);
            Assert.True(response.StatusCode == HttpStatusCode.BadRequest);
            Assert.False(result!.Success);
            Assert.NotEmpty(result.ErrorMessage);
        }
    }
}