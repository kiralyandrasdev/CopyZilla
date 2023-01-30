using System;
using CopyZillaBackend.Application.Webhook.Enum;

namespace CopyZillaBackend.Application.Features.Webhook.Attributes
{
    [AttributeUsage(AttributeTargets.Class)]
    public class WebhookEventHandlerAttribute : Attribute
	{
		public WebhookEventType EventType { get; }

        public WebhookEventHandlerAttribute(WebhookEventType eventType)
        {
            EventType = eventType;
        }
    }
}

