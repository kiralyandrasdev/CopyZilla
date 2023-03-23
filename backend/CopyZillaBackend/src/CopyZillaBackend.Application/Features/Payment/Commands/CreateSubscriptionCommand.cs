using System;
using MediatR;

namespace CopyZillaBackend.Application.Features.Payment.Commands
{
    public class CreateSubscriptionCommand : IRequest<CreateSubscriptionCommandResult>
    {
        public Guid UserId { get; }
        public CreateSubscriptionCommand(Guid userId)
        {
            UserId = userId;
        }
    }
}

