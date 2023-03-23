using CopyZillaBackend.Application.Contracts.Persistence;
using CopyZillaBackend.Application.Contracts.Webhook;
using CopyZillaBackend.Application.Features.Webhook.Attributes;
using CopyZillaBackend.Application.Webhook.Enum;
using Stripe;

namespace CopyZillaBackend.Infrastructure.StripeServices.Webhook.EventHandlers
{
    [WebhookEventHandler(WebhookEventType.CustomerSubscriptionDeleted)]
    public class CustomerSubscriptionDeletedEventHandler : IWebhookEventHandler
    {
        private readonly Event _event;
        private readonly IUserRepository _userRepository;

        public CustomerSubscriptionDeletedEventHandler(Event @event, IUserRepository userRepository)
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

            user.SubscriptionValidUntil = subscription.CanceledAt;
            user.SubscriptionStatus = subscription.Status;

            await _userRepository.UpdateAsync(user);
        }
    }
}
