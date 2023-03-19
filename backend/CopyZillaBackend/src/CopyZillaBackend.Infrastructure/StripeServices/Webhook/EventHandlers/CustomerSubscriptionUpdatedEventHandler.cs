using CopyZillaBackend.Application.Contracts.Persistence;
using CopyZillaBackend.Application.Contracts.Webhook;
using CopyZillaBackend.Application.Features.Webhook.Attributes;
using CopyZillaBackend.Application.Webhook.Enum;
using Stripe;

namespace CopyZillaBackend.Infrastructure.StripeServices.Webhook.EventHandlers
{
    [WebhookEventHandler(WebhookEventType.CustomerSubscriptionUpdated)]
    public class CustomerSubscriptionUpdatedEventHandler : IWebhookEventHandler
    {
        private readonly Event _event;
        private readonly IUserRepository _repository;

        public CustomerSubscriptionUpdatedEventHandler(Event @event, IUserRepository repository)
        {
            _event = @event;
            _repository = repository;
        }

        public async Task ExecuteAsync()
        {
            if (_event.Data.Object is not Subscription subscription)
                throw new Exception("Subscription is null");

            var user = await _repository.GetByCustomerIdAsync(subscription.CustomerId);

            if (user == null)
                throw new Exception("User is null");

            if (subscription.Status != "active")
                user.SubscriptionValidUntil = DateTime.UtcNow.AddDays(-1);
            else
                user.SubscriptionValidUntil = subscription.CurrentPeriodEnd;

            await _repository.UpdateAsync(user);
        }
    }
}