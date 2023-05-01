using CopyZillaBackend.Application.Contracts.Payment;

namespace CopyZillaBackend.Application.Features.Payment.Commands
{
    public class CreateSubscriptionCommandResult : BaseEventResult
    {
        public string Value { get; set; }
    }
}