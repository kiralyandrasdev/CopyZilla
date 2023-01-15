using System;
using CopyZillaBackend.Application.Contracts.Payment;
using CopyZillaBackend.Application.Contracts.Persistence;
using MediatR;

namespace CopyZillaBackend.Application.Features.Webhook.ProcessStripeWebhook
{
	public class ProcessStripeWebhookCommandHandler : IRequestHandler<ProcessStripeWebhookCommand, ProcessStripeWebhookCommandResult>
	{
        private readonly IUserRepository _repository;
        private readonly IStripeService _stripeService;

        public ProcessStripeWebhookCommandHandler(IUserRepository repository, IStripeService stripeService)
        {
            _repository = repository;
            _stripeService = stripeService;
        }

        public async Task<ProcessStripeWebhookCommandResult> Handle(ProcessStripeWebhookCommand request, CancellationToken cancellationToken)
        {
            var result = new ProcessStripeWebhookCommandResult();

            // Process webhook based on request.Payload.Event

            return result;
        }
    }
}

