using System;
using CopyZillaBackend.Application.Contracts.Payment;
using CopyZillaBackend.Application.Contracts.Persistence;
using CopyZillaBackend.Application.Contracts.Webhook;
using MediatR;

namespace CopyZillaBackend.Application.Features.Webhook.Command
{
	public class ProcessWebhookCommandHandler : IRequestHandler<ProcessWebhookCommand, ProcessWebhookCommandResult>
	{
        private readonly IWebhookEventHandlerProvider _webhookEventHandlerProvider;

        public ProcessWebhookCommandHandler(IWebhookEventHandlerProvider webhookEventHandlerProvider)
        {
            _webhookEventHandlerProvider = webhookEventHandlerProvider;
        }

        public async Task<ProcessWebhookCommandResult> Handle(ProcessWebhookCommand request, CancellationToken cancellationToken)
        {
            var result = new ProcessWebhookCommandResult();

            var handler = _webhookEventHandlerProvider.FindHandler(request.Event, request.EventType);

            if (handler != null)
                await handler.ExecuteAsync();

            return result;
        }
    }
}

