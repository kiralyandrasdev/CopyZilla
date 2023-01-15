using System;
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

        public async Task<ActionResult<CreateCheckoutSessionCommandResult>> CreateCheckoutSessionAsync([FromBody] CreateCheckoutSessionOptions options)
		{
			var result = await _mediator.Send(new CreateCheckoutSessionCommand(options));

			return _responseManager.MapActionResult(result);
		}
	}
}

