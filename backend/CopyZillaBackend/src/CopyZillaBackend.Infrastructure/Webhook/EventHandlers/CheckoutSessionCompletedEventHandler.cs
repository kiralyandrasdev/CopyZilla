using System;
using CopyZillaBackend.Application.Contracts.Payment;
using CopyZillaBackend.Application.Contracts.Persistence;
using CopyZillaBackend.Application.Contracts.Webhook;
using CopyZillaBackend.Application.Features.Webhook.Attributes;
using CopyZillaBackend.Application.Webhook.Enum;
using Stripe;
using Stripe.Checkout;

namespace CopyZillaBackend.Infrastructure.Webhook.Events
{
    [WebhookEventHandler(WebhookEventType.CheckoutSessionCompleted)]
    public class CheckoutSessionCompletedEventHandler : IWebhookEventHandler
    {
        private readonly Event _event;
        private readonly IUserRepository _userRepository;

        public CheckoutSessionCompletedEventHandler(Event @event, IUserRepository userRepository)
        {
            _event = @event;
            _userRepository = userRepository;
        }

        public async Task ExecuteAsync()
        {
          /*   var sessionService = new SessionService();

            var sessionData = _event.Data.Object == null ? null : _event.Data.Object as Session;

            if (sessionData == null)
                return;

            var session = await sessionService.GetAsync(sessionData.Id, new SessionGetOptions() { Expand = new List<string>() { "line_items.data.price.product", "customer" } });

            var item = session.LineItems.FirstOrDefault();

            if (item == null)
                return;

            var product = item.Price.Product;

            if (!product.Metadata.ContainsKey("credit_count"))
                return;

            var user = await _userRepository.GetByCustomerIdAsync(session.Customer.Id);

            if (user == null)
                return;

            await _userRepository.IncreaseCreditCount(user.FirebaseUid, int.Parse(product.Metadata["credit_count"])); */
        }
    }
}

