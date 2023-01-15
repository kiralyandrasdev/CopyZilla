using System;
using MediatR;

namespace CopyZillaBackend.Application.Features.Webhook.ProcessStripeWebhook
{
	public class ProcessStripeWebhookCommand : IRequest<ProcessStripeWebhookCommandResult>
	{
		public StripeWebhookPayload Payload { get; }

        public ProcessStripeWebhookCommand(StripeWebhookPayload payload)
        {
            Payload = payload;
        }
    }
}

