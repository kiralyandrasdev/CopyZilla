using CopyZillaBackend.Application.Contracts.Payment;
using CopyZillaBackend.Application.Events;

namespace CopyZillaBackend.Application.Features.Payment.Commands
{
    public class CreateCheckoutSessionCommandResult : BaseEventResult
    {
        public StripeCheckoutSession Value { get; set; }
    }
}