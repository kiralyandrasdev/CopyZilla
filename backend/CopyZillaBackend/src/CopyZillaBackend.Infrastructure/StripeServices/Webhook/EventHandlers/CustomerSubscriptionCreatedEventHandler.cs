using CopyZillaBackend.Application.Contracts.Persistence;
using CopyZillaBackend.Application.Contracts.Webhook;
using CopyZillaBackend.Application.Features.Webhook.Attributes;
using CopyZillaBackend.Application.Webhook.Enum;
using Stripe;

namespace CopyZillaBackend.Infrastructure.StripeServices.Webhook.EventHandlers
{
    [WebhookEventHandler(WebhookEventType.CustomerSubscriptionCreated)]
    public class CustomerSubscriptionCreatedEventHandler : IWebhookEventHandler
    {
        private readonly Event _event;
        private readonly IUserRepository _userRepository;

        public CustomerSubscriptionCreatedEventHandler(Event @event, IUserRepository userRepository)
        {
            _event = @event;
            _userRepository = userRepository;
        }

        public async Task ExecuteAsync()
        {
            if (_event.Data.Object is not Subscription subscription)
                throw new Exception("Subscription is null");

            var user = await _userRepository.GetByCustomerIdAsync(subscription.CustomerId);

            if (user == null)
                throw new Exception("User is null");

            var productId = subscription.Items.Data.FirstOrDefault()?.Price.ProductId;

            if (productId == null)
                throw new Exception("ProductId is null");

            user.ProductId = productId;
            user.SubscriptionValidUntil = subscription.CurrentPeriodEnd;
            user.SubscriptionStatus = subscription.Status;

            await _userRepository.UpdateAsync(user);

            // Cancel all other subscriptions
            var subscriptionService = new SubscriptionService();
            var subscriptions = await subscriptionService.ListAsync(new SubscriptionListOptions
            {
                Customer = subscription.CustomerId,
                Status = "active"
            });

            foreach (var sub in subscriptions.Where(e => e.Id != subscription.Id))
            {
                await subscriptionService.CancelAsync(sub.Id);
            }
        }
    }
}