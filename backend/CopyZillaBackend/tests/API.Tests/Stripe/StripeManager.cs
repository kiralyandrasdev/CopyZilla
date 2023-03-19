using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.Extensions.Configuration;
using Stripe;

namespace API.Tests.Stripe
{
    public class StripeManager
    {
        private readonly WebApplicationFactory<Program> _factory;

        public StripeManager(WebApplicationFactory<Program> factory)
        {
            _factory = factory;

            var configuration = _factory.Services.GetService(typeof(IConfiguration)) as IConfiguration;
            StripeConfiguration.ApiKey = configuration!.GetSection("Stripe").GetValue<string>("ApiKey");
        }

        public async Task<Customer> CreateCustomerAsync(string email)
        {
            var service = new CustomerService();
            var options = new CustomerCreateOptions() { Email = email };
            return await service.CreateAsync(options);
        }

        public async Task<Customer> FindCustomerAsync(string customerId)
        {
            var service = new CustomerService();
            return await service.GetAsync(customerId);
        }

        public async Task DeleteCustomerAsync(string customerId)
        {
            var service = new CustomerService();
            await service.DeleteAsync(customerId);
        }

        public async Task<StripeList<Customer>> ListCustomersAsync()
        {
            var service = new CustomerService();
            var customers = await service.ListAsync(new CustomerListOptions() { Limit = 100 });

            return customers;
        }

        public async Task<List<Product>> ListProductsAsync()
        {
            var service = new ProductService();
            var products = await service.ListAsync(new ProductListOptions() { Limit = 100 });

            var filteredProducts = products.Where(p => p.Active).ToList();

            return filteredProducts;
        }
    }
}