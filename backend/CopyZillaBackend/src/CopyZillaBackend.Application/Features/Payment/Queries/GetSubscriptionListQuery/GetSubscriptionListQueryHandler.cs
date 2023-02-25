using CopyZillaBackend.Application.Contracts.Payment;
using MediatR;

namespace CopyZillaBackend.Application.Features.Payment.Queries.GetSubscriptionListQuery
{
    public class GetSubscriptionListQueryHandler : IRequestHandler<GetSubscriptionListQuery, GetSubscriptionListQueryResult>
    {
        private readonly IStripeService _stripeService;

        public GetSubscriptionListQueryHandler(IStripeService subscriptionRepository)
        {
            _stripeService = subscriptionRepository;
        }

        public async Task<GetSubscriptionListQueryResult> Handle(GetSubscriptionListQuery request, CancellationToken cancellationToken)
        {
            var result = new GetSubscriptionListQueryResult();

            var subscriptions = await _stripeService.GetAvailableProductsAsync("subscription");
            subscriptions = subscriptions.OrderBy(e => int.Parse(e.Metadata["credit_count"])).ToList();

            result.Value = subscriptions.Select(e =>
            {
                var features = new List<string>();

                if(e.Metadata.ContainsKey("features") && !string.IsNullOrEmpty(e.Metadata["features"]))
                    features = e.Metadata["features"].Split(',').ToList();

                return new GetSubscriptionListQueryDto()
                {
                    Name = e.Name,
                    PriceId = e.DefaultPriceId,
                    PriceFormatted = e.Metadata["price_formatted"],
                    CreditFormatted = e.Metadata["credit_count_formatted"],
                    PlanType = e.Metadata["plan_type"],
                    Description = e.Description,
                    PricingInterval = e.Metadata["pricing_interval"],
                    Features = features
                };
            })
            .ToList();

            return result;
        }
    }
}