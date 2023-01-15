using System;
using MediatR;
using Stripe;

namespace CopyZillaBackend.Application.Features.Webhook.ProcessStripeWebhook
{
	public class ProcessStripeWebhookCommand : IRequest<ProcessStripeWebhookCommandResult>
	{
		public Event Payload { get; }

        public ProcessStripeWebhookCommand(Event payload)
        {
            Payload = payload;
        }
    }
}

