using System;
using CopyZillaBackend.Application.Contracts.Payment;
using Microsoft.AspNetCore.Mvc;
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

            StripeConfiguration.ApiKey = _configuration.GetValue<string>("StripeApiKey");
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

        public async Task<Customer> CreateCustomerAsync(string email)
        {
            var service = new CustomerService();

            var options = new CustomerCreateOptions() { Email = email };

            return await service.CreateAsync(options);
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

            var filteredProducts = products.Data.Where(e => e.Metadata?["type"] == type.ToLower()).ToList();

            var priceService = new PriceService();
            var priceGetOptions = new PriceGetOptions() { Expand = new List<string>() { "currency_options" } };

            foreach(var product in filteredProducts)
            {
                product.DefaultPrice = await priceService.GetAsync(product.DefaultPriceId, priceGetOptions);
            }

            return filteredProducts;
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
    }
}

