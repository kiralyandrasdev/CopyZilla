using CopyZillaBackend.Application.Contracts.Payment;
using CopyZillaBackend.Application.Events;

namespace CopyZillaBackend.Application.Features.Payment.Commands
{
    public class CreateSubscriptionCommandResult : BaseEventResult
    {
        public string Value { get; set; }
    }
}