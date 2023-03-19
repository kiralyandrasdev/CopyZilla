using CopyZillaBackend.Application.Common;
using CopyZillaBackend.Application.Contracts.Cache;
using CopyZillaBackend.Application.Contracts.Payment;
using System.Collections.Concurrent;

namespace CopyZillaBackend.Infrastructure.StripeServices.Product
{
    public class ProductService : IProductService
    {
        private readonly IStripeService _stripeService;
        private readonly ConcurrentDictionary<string, Domain.Entities.Product> _cache = new();
        private readonly List<string> _requiredMetaDataList;

        public ProductService(IStripeService stripeService)
        {
            _stripeService = stripeService;
            _requiredMetaDataList = Enum.GetValues(typeof(StripeProductMetadata)).Cast<StripeProductMetadata>().Select(c => c.ToString()).ToList();
        }

        public async Task LoadProductsToCacheAsync()
        {
            var cachedProducts = _cache.Values.ToList();

            foreach (var p in cachedProducts)
                _cache.Remove(p.Id, out _);

            var products = await GetProductListFromStripe();

            foreach (var product in products)
                _cache.TryAdd(product.Id, product);
        }

        public async Task<Domain.Entities.Product> GetProductAsync(string productId)
        {
            var exists = _cache.TryGetValue(productId, out var cachedProduct);

            if (exists)
                return cachedProduct;

            var products = await GetProductListFromStripe();

            var product = products.FirstOrDefault(e => e.Id == productId);

            if (product == null)
                throw new InvalidOperationException("Product does not exist in Stripe.");

            _cache.TryAdd(product.Id, product);

            return product;
        }

        public async Task<List<Domain.Entities.Product>> GetProductListAsync()
        {
            var cachedProductList = _cache.Values.ToList();

            if (cachedProductList.Count > 0)
                return cachedProductList;

            var products = await GetProductListFromStripe();

            foreach (var product in products)
                _cache.TryAdd(product.Id, product);

            return products;
        }

        private async Task<List<Domain.Entities.Product>> GetProductListFromStripe()
        {
            var products = await _stripeService.GetAvailableProductsAsync();

            if (!products.Any())
                throw new InvalidOperationException("Products are not available in Stripe.");

            products = products.OrderBy(e => int.Parse(e.Metadata[nameof(StripeProductMetadata.credit_limit)])).ToList();

            // validate metadata is filled for each subscription
            foreach (var subscription in products)
                ValidateMetadata(subscription.Metadata);

            var result = products.Select(e =>
            {
                return new Domain.Entities.Product()
                {
                    Id = e.Id,
                    Name = e.Name,
                    PriceId = e.DefaultPriceId,
                    Description = e.Description,
                    PriceFormatted = e.Metadata[nameof(StripeProductMetadata.price_formatted)],
                    DailyCreditLimit = int.Parse(e.Metadata[nameof(StripeProductMetadata.credit_limit)]),
                    CreditFormatted = e.Metadata[nameof(StripeProductMetadata.credit_limit_formatted)],
                    PlanType = e.Metadata[nameof(StripeProductMetadata.plan_type)],
                    PricingInterval = e.Metadata[nameof(StripeProductMetadata.pricing_interval)],
                    Features = e.Metadata[nameof(StripeProductMetadata.features)].Split(',').ToList()
                };
            })
            .ToList();

            return result;
        }

        private void ValidateMetadata(Dictionary<string, string> metaDataCollection)
        {
            foreach (var metaData in _requiredMetaDataList)
            {
                if (!metaDataCollection.ContainsKey(metaData))
                    throw new KeyNotFoundException($"{metaData} key is missing from Product metadata.");

                if (string.IsNullOrEmpty(metaDataCollection[metaData]))
                    throw new ArgumentNullException($"{metaData} value is empty in Product metadata.");
            }
        }
    }
}