using CopyZillaBackend.Application.Contracts.Helpers;
using CopyZillaBackend.Application.Features.Payment.Commands;
using MediatR;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace CopyZillaBackend.API.Controllers
{
    [EnableCors("localhost")]
    [ApiController]
    [Route("api/[controller]")]
    public class CheckoutController : ControllerBase
    {
        private readonly IMediator _mediator;
        private readonly IResponseManager _responseManager;

        public CheckoutController(IMediator mediator, IResponseManager responseManager)
        {
            _mediator = mediator;
            _responseManager = responseManager;
        }

        [HttpPost("subscription")]
        public async Task<ActionResult<CreateCheckoutSessionCommandResult>> CreateSubscriptionCheckoutSessionAsync([FromBody] CreateCheckoutSessionOptions options)
        {
            var result = await _mediator.Send(new CreateCheckoutSessionCommand("subscription", options));

            return _responseManager.MapActionResult(result);
        }

        [HttpPost("payment")]
        public async Task<ActionResult<CreateCheckoutSessionCommandResult>> CreatePaymentCheckoutSessionAsync([FromBody] CreateCheckoutSessionOptions options)
        {
            var result = await _mediator.Send(new CreateCheckoutSessionCommand("payment", options));

            return _responseManager.MapActionResult(result);
        }
    }
}

