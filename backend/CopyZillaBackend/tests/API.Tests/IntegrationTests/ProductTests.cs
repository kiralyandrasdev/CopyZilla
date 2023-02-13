using API.Tests.Engine;
using CopyZillaBackend.Application.Features.Payment.Queries.GetProductListQuery;
using CopyZillaBackend.Application.Features.Payment.Queries.GetSubscriptionListQuery;
using FluentAssertions;
using Newtonsoft.Json;
using System.Net;
using Xunit.Priority;

namespace API.Tests.IntegrationTests
{
    [Collection("Serial")]
    [TestCaseOrderer(PriorityOrderer.Name, PriorityOrderer.Assembly)]
    public class ProductTests : IClassFixture<WebApplicationFactoryEngine<Program>>
    {
        private readonly WebApplicationFactoryEngine<Program> _factory;
        private readonly HttpClient _client;

        public ProductTests(WebApplicationFactoryEngine<Program> factory)
        {
            _factory = factory;
            _client = factory.CreateDefaultClient(new Uri("https://localhost:7107/api/"));
        }

        [Fact]
        public async Task Should_Get_Available_Goods()
        {
            var response = await _client.GetAsync($"/api/product/goods");
            var responseBody = await response.Content.ReadAsStringAsync();
            var result = JsonConvert.DeserializeObject<GetProductListQueryResult>(responseBody);

            // assert
            result.Should().NotBeNull();
            response.StatusCode.Should().Be(HttpStatusCode.OK);
            result.Value.Select(e => e.PriceId).Should().NotBeNullOrEmpty();
            result.Value.Select(e => e.Name).Should().NotBeNullOrEmpty();
            result.Value.Select(e => e.CreditFormatted).Should().NotBeNullOrEmpty();
            result.Value.Select(e => e.PriceFormatted).Should().NotBeNullOrEmpty();
        }

        [Fact]
        public async Task Should_Get_Available_Subscriptions()
        {
            var response = await _client.GetAsync($"/api/product/subscriptions");
            var responseBody = await response.Content.ReadAsStringAsync();
            var result = JsonConvert.DeserializeObject<GetSubscriptionListQueryResult>(responseBody);

            // assert
            result.Should().NotBeNull();
            response.StatusCode.Should().Be(HttpStatusCode.OK);
            result.Value.Select(e => e.PriceId).Should().NotBeNullOrEmpty();
            result.Value.Select(e => e.Name).Should().NotBeNullOrEmpty();
            result.Value.Select(e => e.PlanType).Should().NotBeNullOrEmpty();
            result.Value.Select(e => e.CreditFormatted).Should().NotBeNullOrEmpty();
            result.Value.Select(e => e.PriceFormatted).Should().NotBeNullOrEmpty();
        }
    }
}