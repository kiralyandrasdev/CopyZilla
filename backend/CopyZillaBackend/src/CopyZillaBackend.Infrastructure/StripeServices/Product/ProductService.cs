using CopyZillaBackend.Application.Common;
using CopyZillaBackend.Application.Contracts.Cache;
using CopyZillaBackend.Application.Contracts.Payment;
using CopyZillaBackend.Application.Contracts.Persistence;

namespace CopyZillaBackend.Infrastructure.StripeServices.Product
{
    public class ProductService : IProductService
    {
        private readonly ICacheService _cacheService;
        private readonly IStripeService _stripeService;
        private readonly List<string> _requiredMetaDataList;

        public ProductService(ICacheService cacheService, IStripeService stripeService)
        {
            _cacheService = cacheService;
            _stripeService = stripeService;
            _requiredMetaDataList = Enum.GetValues(typeof(StripeProductMetadata)).Cast<StripeProductMetadata>().Select(c => c.ToString()).ToList();
        }

        public async Task LoadProductsToCacheAsync()
        {
            var cachedProducts = await _cacheService.GetAllValuesOfTypeAsync<Domain.Entities.Product>();

            foreach (var p in cachedProducts)
                await _cacheService.RemoveAsync(p.Id);

            var products = await GetProductListFromStripe();

            foreach (var product in products)
                await _cacheService.SetAsync(product.Id, product);
        }

        public async Task<Domain.Entities.Product> GetProductAsync(string productId)
        {
            var cachedProduct = await _cacheService.GetAsync<Domain.Entities.Product>(productId);

            if (cachedProduct != null)
                return cachedProduct;

            var products = await GetProductListFromStripe();

            var product = products.FirstOrDefault(e => e.Id == productId);

            if (product == null)
                throw new InvalidOperationException("Product does not exist in Stripe.");

            await _cacheService.SetAsync(product.Id, product);

            return product;
        }

        public async Task<List<Domain.Entities.Product>> GetProductListAsync()
        {
            var cachedProductList = await _cacheService.GetAllValuesOfTypeAsync<Domain.Entities.Product>();

            if (cachedProductList.Count > 0)
                return cachedProductList;

            var products = await GetProductListFromStripe();

            foreach (var product in products)
                await _cacheService.SetAsync(product.Id, product);

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