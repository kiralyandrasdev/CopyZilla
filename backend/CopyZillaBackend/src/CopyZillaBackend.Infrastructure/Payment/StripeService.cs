using CopyZillaBackend.Application.Contracts.Payment;
using CopyZillaBackend.Application.Features.User.Commands.CreateUserCommand;
using CopyZillaBackend.Application.Features.User.Commands.UpdateUserCommand;
using Microsoft.Extensions.Configuration;
using Stripe;
using Stripe.Checkout;

namespace CopyZillaBackend.Infrastructure.Payment
{
    public class StripeService : IStripeService
    {
        private readonly IConfiguration _configuration;

        public StripeService(IConfiguration configuration)
        {
            _configuration = configuration;

            StripeConfiguration.ApiKey = _configuration.GetSection("Stripe").GetValue<string>("ApiKey");
        }

        public async Task<StripeCheckoutSession> CreateCheckoutSessionAsync(string customerId, string priceId, string mode)
        {
            var service = new SessionService();

            var domain = _configuration.GetSection("Client").GetValue<string>("Url");
            var successRedirectRoute = _configuration.GetSection("Client").GetValue<string>("CheckoutSuccessRedirectRoute");
            var cancelRedirectRoute = _configuration.GetSection("Client").GetValue<string>("CheckoutCancelRedirectRoute");

            var options = new SessionCreateOptions
            {
                LineItems = new List<SessionLineItemOptions>
                {
                  new SessionLineItemOptions
                  {
                    Price = priceId,
                    Quantity = 1,
                  },
                },
                Customer = customerId,
                Mode = mode,
                SuccessUrl = domain + successRedirectRoute,
                CancelUrl = domain + cancelRedirectRoute,
            };

            Session session = await service.CreateAsync(options);
            return new StripeCheckoutSession(session.Url);
        }

        public async Task<Customer> CreateCustomerAsync(CreateUserCommandOptions options)
        {
            var service = new CustomerService();

            string name = string.Empty;

            if (!string.IsNullOrEmpty(options.FirstName) && !string.IsNullOrEmpty(options.LastName))
                name = options.FirstName + " " + options.LastName;

            var customerCreateOptions = new CustomerCreateOptions()
            {
                Email = options.Email,
                Name = name,
            };

            return await service.CreateAsync(customerCreateOptions);
        }

        public async Task UpdateCustomerAsync(string customerId, UpdateUserCommandOptions options)
        {
            var service = new CustomerService();

            var customerUpdateOptions = new CustomerUpdateOptions()
            {
                Email = options.Email
            };

            await service.UpdateAsync(customerId, customerUpdateOptions);
        }

        public async Task DeleteCustomerAsync(string customerId)
        {
            var service = new CustomerService();

            await service.DeleteAsync(customerId);
        }

        public async Task<Subscription> CreateSubscriptionAsync(string customerId, string priceId)
        {
            var options = new SubscriptionCreateOptions
            {
                Customer = customerId,
                Items = new List<SubscriptionItemOptions>()
                {
                    new SubscriptionItemOptions()
                    {
                        Price = priceId,
                    }
                }
            };
            var subscriptionService = new SubscriptionService();
            return await subscriptionService.CreateAsync(options);
        }

        public async Task<List<Product>> GetAvailableProductsAsync(string type)
        {
            var productService = new ProductService();

            var productListOptions = new ProductListOptions
            {
                Active = true
            };

            var products = await productService.ListAsync(
              productListOptions);

            var priceService = new PriceService();
            var priceGetOptions = new PriceGetOptions() { Expand = new List<string>() { "currency_options" } };

            foreach (var product in products)
            {
                product.DefaultPrice = await priceService.GetAsync(product.DefaultPriceId, priceGetOptions);
            }

            return products.ToList();
        }

        public async Task<Customer> GetCustomerByEmailAsync(string email)
        {
            throw new NotImplementedException();
        }

        public async Task<Customer> GetCustomerByIdAsync(string customerId)
        {
            var service = new CustomerService();

            var options = new CustomerGetOptions();
            options.AddExpand("subscriptions");

            return await service.GetAsync(customerId, options);
        }

        public async Task<Product> GetProductAsync(string productId)
        {
            var service = new ProductService();
            return await service.GetAsync(productId);
        }
    }
}

