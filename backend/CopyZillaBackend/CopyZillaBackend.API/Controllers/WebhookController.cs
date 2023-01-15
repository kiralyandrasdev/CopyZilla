using System;
using CopyZillaBackend.Application.Contracts.Helpers;
using CopyZillaBackend.Application.Features.Webhook.ProcessStripeWebhook;
using MediatR;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace CopyZillaBackend.API.Controllers
{
    [EnableCors("localhost")]
    [ApiController]
    [Route("api/[controller]")]
    public class WebhookController : ControllerBase
	{
        private readonly IMediator _mediator;
		private readonly IResponseManager _responseManager;

        public WebhookController(IMediator mediator, IResponseManager responseManager)
        {
            _mediator = mediator;
            _responseManager = responseManager;
        }

        /// <summary>
        /// TODO: Verify Stripe signature to secure endpoint: https://stripe.com/docs/webhooks/signatures.
        ///
        /// Webhook does not wait for event to finish processing and returns 204 as soon as possible as
        /// Stripe documentation suggests: https://stripe.com/docs/webhooks.
        ///
        /// To test the webhook in development environemnt follow the Stripe guide: https://stripe.com/docs/webhooks/test
        /// </summary>
        /// <param name="payload"></param>
        /// <returns></returns>
        [Route("payment/webhook")]
        [HttpPost]
        public IActionResult ProcessStripeWebhook([FromBody] StripeWebhookPayload payload)
        {
            // We should not wait for the event
            Task.Run(() => _mediator.Send(new ProcessStripeWebhookCommand(payload)));

            return new NoContentResult();
        }
    }
}

