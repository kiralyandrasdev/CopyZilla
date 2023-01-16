using System;
using CopyZillaBackend.Application.Contracts.Helpers;
using CopyZillaBackend.Application.Features.Payment.Queries.GetProductListQuery;
using MediatR;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace CopyZillaBackend.API.Controllers
{
    [EnableCors("localhost")]
    [ApiController]
    [Route("api/[controller]")]
    public class ProductController
	{
		private readonly IMediator _mediator;
		private readonly IResponseManager _responseManager;

        public ProductController(IMediator mediator, IResponseManager responseManager)
        {
            _mediator = mediator;
            _responseManager = responseManager;
        }

        [HttpGet]
        [Route("goods")]
        public async Task<ActionResult<GetProductListQueryResult>> GetGoodsListAsync()
        {
            var result = await _mediator.Send(new GetProductListQuery("goods"));

            return _responseManager.MapActionResult(result);
        }

        [HttpGet]
        [Route("subscriptions")]
        public async Task<ActionResult<GetProductListQueryResult>> GetSubscriptionListAsync()
        {
            var result = await _mediator.Send(new GetProductListQuery("subscription"));

            return _responseManager.MapActionResult(result);
        }
    }
}

