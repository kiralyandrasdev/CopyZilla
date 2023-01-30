using CopyZillaBackend.Application.Features.User.Commands.CreateUserCommand;
using CopyZillaBackend.Application.Features.User.Commands.UpdateUserCommand;
using Stripe;

namespace CopyZillaBackend.Application.Contracts.Payment
{
    public interface IStripeService
    {
        /// <summary>
        /// Creates customer in stripe and returns customer id.
        /// </summary>
        /// <param name="email"></param>
        /// <returns></returns>
		Task<Customer> CreateCustomerAsync(CreateUserCommandOptions options);

        /// <summary>
        /// Updates customer in stripe.
        /// </summary>
        /// <param name="customerId"></param>
        /// <param name="options"></param>
        Task UpdateCustomerAsync(string customerId, UpdateUserCommandOptions options);

        /// <summary>
        /// Returns null if customer does not exist.
        /// </summary>
        /// <param name="identity"></param>
        /// <returns></returns>
        Task<Customer> GetCustomerByIdAsync(string customerId);

        /// <summary>
        /// Returns null if customer does not exist.
        /// </summary>
        /// <param name="identity"></param>
        /// <returns></returns>
        Task<Customer> GetCustomerByEmailAsync(string email);

        /// <summary>
        /// Attaches new subscription to customer based on priceId.
        /// PriceId points to corresponding product.
        /// </summary>
        /// <param name="customerId"></param>
        /// <param name="priceId"></param>
        /// <returns></returns>
        Task<Subscription> CreateSubscriptionAsync(string customerId, string priceId);

        /// <summary>
        /// Returns available products. Type can be either 'goods' or 'subscription', non case sensitive.
        /// </summary>
        /// <returns></returns>
        Task<List<Product>> GetAvailableProductsAsync(string type);

        /// <summary>
        /// Creates checkout session url to follow for client to complete purchase.
        /// Mode: 'subscription' or 'payment'
        /// </summary>
        /// <param name="customerId"></param>
        /// <param name="priceId"></param>
        /// <param name="mode"></param>
        /// <returns></returns>
        Task<StripeCheckoutSession> CreateCheckoutSessionAsync(string customerId, string priceId, string mode);
    }
}

