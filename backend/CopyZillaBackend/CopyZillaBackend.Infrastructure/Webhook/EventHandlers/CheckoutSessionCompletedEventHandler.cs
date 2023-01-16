using System;
using CopyZillaBackend.Application.Contracts.Persistence;
using CopyZillaBackend.Application.Contracts.Webhook;
using CopyZillaBackend.Application.Features.Webhook.Attributes;
using CopyZillaBackend.Application.Webhook.Enum;

namespace CopyZillaBackend.Infrastructure.Webhook.Events
{
    [WebhookEventHandler(WebhookEventType.CheckoutSessionCompleted)]
    public class CheckoutSessionCompletedEventHandler : IWebhookEventHandler
	{
        private readonly IServiceProvider _serviceProvider;

        public CheckoutSessionCompletedEventHandler(IServiceProvider serviceProvider)
		{
            _serviceProvider = serviceProvider;
		}

        public async Task ExecuteAsync()
        {
            await Task.Delay(2000);
        }
    }
}

