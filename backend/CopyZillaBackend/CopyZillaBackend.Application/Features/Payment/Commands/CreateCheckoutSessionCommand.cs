using System;
using MediatR;

namespace CopyZillaBackend.Application.Features.Payment.Commands
{
	public class CreateCheckoutSessionCommand : IRequest<CreateCheckoutSessionCommandResult>
	{
		public CreateCheckoutSessionOptions Options { get; }

        public CreateCheckoutSessionCommand(CreateCheckoutSessionOptions options)
        {
            Options = options;
        }
    }
}

