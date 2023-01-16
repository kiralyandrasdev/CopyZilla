using System;
using System.Reflection;
using CopyZillaBackend.Application.Contracts.Webhook;
using CopyZillaBackend.Application.Features.Webhook.Attributes;
using CopyZillaBackend.Application.Webhook.Enum;
using Microsoft.Extensions.DependencyInjection;
using Stripe;

namespace CopyZillaBackend.Infrastructure.Webhook
{
    public class WebhookEventHandlerProvider : IWebhookEventHandlerProvider
    {
        private readonly IServiceScopeFactory _scopeFactory;

        public WebhookEventHandlerProvider(IServiceScopeFactory scopeFactory)
        {
            _scopeFactory = scopeFactory;
        }

        public IWebhookEventHandler? FindHandler(Event @event, WebhookEventType eventType)
        {
            var handlerType = Assembly.GetExecutingAssembly()
                .GetTypes()
                .FirstOrDefault(e =>
                {
                    var attr = e.GetCustomAttribute(typeof(WebhookEventHandlerAttribute));

                    if (attr == null)
                        return false;

                    return ((WebhookEventHandlerAttribute)attr).EventType == eventType;
                });

            if (handlerType == null)
                return null;

            var sp = _scopeFactory.CreateScope().ServiceProvider;

            return (IWebhookEventHandler)ActivatorUtilities.CreateInstance(sp, handlerType, @event);
        }
    }
}

