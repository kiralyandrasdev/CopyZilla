using System;
using MediatR;

namespace CopyZillaBackend.Application.Features.Payment.Commands
{
    public class CreateCheckoutSessionCommand : IRequest<CreateCheckoutSessionCommandResult>
    {
        public string Mode { get; }
        public CreateCheckoutSessionOptions Options { get; }

        public CreateCheckoutSessionCommand(string mode, CreateCheckoutSessionOptions options)
        {
            Mode = mode;
            Options = options;
        }
    }
}

