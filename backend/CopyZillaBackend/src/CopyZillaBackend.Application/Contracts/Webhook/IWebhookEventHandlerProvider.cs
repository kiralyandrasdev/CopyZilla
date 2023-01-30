using System;
using CopyZillaBackend.Application.Webhook.Enum;
using Stripe;

namespace CopyZillaBackend.Application.Contracts.Webhook
{
	public interface IWebhookEventHandlerProvider
	{
		IWebhookEventHandler? FindHandler(Event @event, WebhookEventType eventType);
	}
}

