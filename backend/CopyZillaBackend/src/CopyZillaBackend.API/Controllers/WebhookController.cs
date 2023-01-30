﻿using System;
using CopyZillaBackend.Application.Contracts.Helpers;
using CopyZillaBackend.Application.Contracts.Payment;
using CopyZillaBackend.Application.Features.Webhook.Command;
using CopyZillaBackend.Application.Webhook.Enum;
using MediatR;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Stripe;

namespace CopyZillaBackend.API.Controllers
{
    [EnableCors("localhost")]
    [ApiController]
    [Route("api/[controller]")]
    public class WebhookController : ControllerBase
    {
        private static readonly Dictionary<string, WebhookEventType> _supportedPaymentEventTypes
            = new Dictionary<string, WebhookEventType>() { { "checkout.session.completed", WebhookEventType.CheckoutSessionCompleted } };

        /// <summary>
        /// TODO: Verify Stripe signature to secure endpoint: https://stripe.com/docs/webhooks/signatures.
        ///
        /// Webhook does not wait for event to finish processing and returns 204 as soon as possible as
        /// Stripe documentation suggests: https://stripe.com/docs/webhooks.
        ///
        /// To test the webhook in development environemnt follow the Stripe guide: https://stripe.com/docs/webhooks/test
        ///
        /// Setup local testing environment: https://dashboard.stripe.com/test/webhooks
        /// </summary>
        /// <param name="payload"></param>
        /// <returns></returns>
        [Route("payment")]
        [HttpPost]
        public async Task<IActionResult> ProcessStripeWebhook([FromServices] IServiceScopeFactory serviceScopeFactory)
        {
            var body = await new StreamReader(HttpContext.Request.Body).ReadToEndAsync();
            var @event = JsonConvert.DeserializeObject<Event>(body);

            if (_supportedPaymentEventTypes.ContainsKey(@event?.Type!))
            {
                // We should not wait for the event to finish processing before returning with a response
                // Later we should rather que events in a background service since this forces
                // the framework to do something that it's not designed to
                //
                // https://learn.microsoft.com/en-us/dotnet/architecture/microservices/multi-container-microservice-net-applications/background-tasks-with-ihostedservice
                Task.Run(async () =>
                {
                    // New scope is needed otherwise returning from the controller
                    // will kill the process before finishing the task
                    using (var scope = serviceScopeFactory.CreateScope())
                    {
                        var mediator = scope.ServiceProvider.GetRequiredService<IMediator>();
                        await mediator.Send(new ProcessWebhookCommand(@event!, _supportedPaymentEventTypes[@event!.Type]));
                    }
                });
            }

            return new NoContentResult();
        }
    }
}
