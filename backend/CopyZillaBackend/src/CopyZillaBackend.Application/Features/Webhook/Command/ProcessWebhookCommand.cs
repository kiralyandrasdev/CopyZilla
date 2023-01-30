using System;
using CopyZillaBackend.Application.Contracts.Payment;
using CopyZillaBackend.Application.Webhook.Enum;
using MediatR;
using Stripe;

namespace CopyZillaBackend.Application.Features.Webhook.Command
{
	public class ProcessWebhookCommand : IRequest<ProcessWebhookCommandResult>
	{
		public Event @Event { get; }
        public WebhookEventType EventType { get; }

        public ProcessWebhookCommand(Event @event, WebhookEventType eventType)
        {
            @Event = @event;
            EventType = eventType;
        }
    }
}

