using CopyZillaBackend.Application.Contracts.Payment;
using CopyZillaBackend.Application.Contracts.Persistence;
using CopyZillaBackend.Application.Contracts.Webhook;
using CopyZillaBackend.Application.Features.Webhook.Attributes;
using CopyZillaBackend.Application.Webhook.Enum;
using Stripe;

namespace CopyZillaBackend.Infrastructure.Webhook.EventHandlers
{
    [WebhookEventHandler(WebhookEventType.CustomerSubscriptionCreated)]
    public class CustomerSubscriptionCreatedEventHandler : IWebhookEventHandler
    {
        private readonly Event _event;
        private readonly IUserRepository _userRepository;
        private readonly IStripeService _stripeService;

        public CustomerSubscriptionCreatedEventHandler(Event @event, IUserRepository userRepository, IStripeService stripeService)
        {
            _event = @event;
            _userRepository = userRepository;
            _stripeService = stripeService;
        }

        public async Task ExecuteAsync()
        {
            if (_event.Data.Object is not Subscription subscription)
                throw new Exception("Subscription is null");

            var user = await _userRepository.GetByCustomerIdAsync(subscription.CustomerId);

            if (user == null)
                throw new Exception("User is null");

            user.SubscriptionValidUntil = subscription.CurrentPeriodEnd;

            var productId = subscription.Items.Data.FirstOrDefault()?.Price.ProductId;

            if (productId == null)
                throw new Exception("ProductId is null");

            var product = await _stripeService.GetProductAsync(productId);

            if (product == null)
                throw new Exception("Product is null");

            if (!product.Metadata.ContainsKey("plan_type"))
                throw new Exception("PlanType key is missing from Product metadata");

            var planType = product.Metadata["plan_type"];

            user.PlanType = planType;

            await _userRepository.UpdateAsync(user);
        }
    }
}