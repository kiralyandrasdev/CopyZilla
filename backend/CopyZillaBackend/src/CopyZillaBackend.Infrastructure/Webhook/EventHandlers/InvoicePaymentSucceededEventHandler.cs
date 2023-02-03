using CopyZillaBackend.Application.Contracts.Payment;
using CopyZillaBackend.Application.Contracts.Persistence;
using CopyZillaBackend.Application.Contracts.Webhook;
using CopyZillaBackend.Application.Features.Webhook.Attributes;
using CopyZillaBackend.Application.Webhook.Enum;
using Stripe;

namespace CopyZillaBackend.Infrastructure.Webhook.EventHandlers
{
    [WebhookEventHandler(WebhookEventType.InvoicePaymentSucceeded)]
    public class InvoicePaymentSucceededEventHandler : IWebhookEventHandler
    {
        private readonly Event _event;
        private readonly IUserRepository _userRepository;
        private readonly IStripeService _stripeService;

        public InvoicePaymentSucceededEventHandler(Event @event, IUserRepository userRepository, IStripeService stripeService)
        {
            _event = @event;
            _userRepository = userRepository;
            _stripeService = stripeService;
        }

        public async Task ExecuteAsync()
        {
            if (_event.Data.Object is not Invoice invoice)
                throw new Exception("Invoice is null");

            var user = await _userRepository.GetByCustomerIdAsync(invoice.CustomerId);

            if (user == null)
                throw new Exception("User is null");

            var productId = invoice.Lines.Data.FirstOrDefault()?.Price.ProductId;

            if (productId == null)
                throw new Exception("ProductId is null");

            var product = await _stripeService.GetProductAsync(productId);

            if (product == null)
                throw new Exception("Product is null");

            if (!product.Metadata.ContainsKey("credit_count"))
                throw new Exception("CreditCount key is missing from Product metadata");

            if (!product.Metadata.ContainsKey("plan_type"))
                throw new Exception("PlanType key is missing from Product metadata");

            var creditCount = int.Parse(product.Metadata["credit_count"]);
            var planType = product.Metadata["plan_type"];
            var periodEnd = invoice.Lines.Data.FirstOrDefault()?.Period.End;

            user.SubscriptionPlanName = product.Name;
            user.CreditCount += creditCount;
            user.PlanType = planType;
            user.SubscriptionValidUntil = periodEnd;

            await _userRepository.UpdateAsync(user);
        }
    }
}