using CopyZillaBackend.Application.Contracts.Cache;
using CopyZillaBackend.Application.Contracts.Payment;
using CopyZillaBackend.Domain.Entities;

namespace CopyZillaBackend.Persistence.Cache
{
    public class ProductService : IProductService
    {
        private readonly IStripeService _stripeService;

        public ProductService(IStripeService stripeService)
        {
            _stripeService = stripeService;
        }

        public async Task<Product> GetProductAsync(string productId)
        {
            if (TempCache.ProductCache.ContainsKey(productId))
                return TempCache.ProductCache[productId];

            var products = await GetProductListAsync();

            foreach (var product in products)
                if(!TempCache.ProductCache.ContainsKey(product.Id))
                    TempCache.ProductCache.Add(product.Id, product);

            return TempCache.ProductCache[productId];
        }

        public async Task<List<Product>> GetProductListAsync()
        {
            if (TempCache.ProductCache.Count > 0)
                return TempCache.ProductCache.Values.ToList();

            var subscriptions = await _stripeService.GetAvailableProductsAsync("subscription");
            subscriptions = subscriptions.OrderBy(e => int.Parse(e.Metadata["credit_limit"])).ToList();

            var result = subscriptions.Select(e =>
            {
                var features = new List<string>();

                if (e.Metadata.ContainsKey("features") && !string.IsNullOrEmpty(e.Metadata["features"]))
                    features = e.Metadata["features"].Split(',').ToList();

                return new Product()
                {
                    Id = e.Id,
                    Name = e.Name,
                    PriceId = e.DefaultPriceId,
                    PriceFormatted = e.Metadata["price_formatted"],
                    DailyCreditLimit = int.Parse(e.Metadata["credit_limit"]),
                    CreditFormatted = e.Metadata["credit_limit_formatted"],
                    PlanType = e.Metadata["plan_type"],
                    Description = e.Description,
                    PricingInterval = e.Metadata["pricing_interval"],
                    Features = features
                };
            })
            .ToList();

            foreach (var product in result)
                TempCache.ProductCache.Add(product.Id, product);

            return result;
        }
    }
}