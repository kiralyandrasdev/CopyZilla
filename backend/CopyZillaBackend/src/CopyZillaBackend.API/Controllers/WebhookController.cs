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
        private static readonly Dictionary<string, WebhookEventType> _supportedPaymentEventTypes = new()
            {
                { "checkout.session.completed", WebhookEventType.CheckoutSessionCompleted },
                // { "invoice.payment_succeeded", WebhookEventType.InvoicePaymentSucceeded },
                { "customer.subscription.created", WebhookEventType.CustomerSubscriptionCreated },
                { "customer.subscription.deleted", WebhookEventType.CustomerSubscriptionDeleted },
                // { "customer.subscription.trial_will_end", WebhookEventType.CustomerSubscriptionTrialWillEnd },
                // { "invoice.payment_failed", WebhookEventType.InvoicePaymentFailed },
                // { "invoice.payment_action_required", WebhookEventType.InvoicePaymentActionRequired },
                { "customer.subscription.updated", WebhookEventType.CustomerSubscriptionUpdated }
            };

        /// <summary>
        /// Webhook does not wait for event to finish processing and returns 204 as soon as possible as
        /// Stripe documentation suggests: https://stripe.com/docs/webhooks.
        ///
        /// To test the webhook in development environemnt follow the Stripe guide: https://stripe.com/docs/webhooks/test
        ///
        /// Setup local testing environment: https://dashboard.stripe.com/test/webhooks
        /// </summary>
        [Route("payment")]
        [HttpPost]
        public IActionResult ProcessStripeWebhook([FromServices] IServiceScopeFactory serviceScopeFactory)
        {
            var body = new StreamReader(HttpContext.Request.Body).ReadToEndAsync().Result;
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

