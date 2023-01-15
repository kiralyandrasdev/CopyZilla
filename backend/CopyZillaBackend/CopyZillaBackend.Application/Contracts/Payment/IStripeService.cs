using System;
using Stripe;

namespace CopyZillaBackend.Application.Contracts.Payment
{
	public interface IStripeService
	{
		Task<Customer> CreateCustomerAsync(string email);

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
        /// Returns available subscription plans.
        /// </summary>
        /// <returns></returns>
        Task<IEnumerable<Product>> GetAvailableSubscriptionsAsync();

        /// <summary>
        /// Returns available one-time purchase products.
        /// </summary>
        /// <returns></returns>
        Task<IEnumerable<Product>> GetAvailableProductsAsync();

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

