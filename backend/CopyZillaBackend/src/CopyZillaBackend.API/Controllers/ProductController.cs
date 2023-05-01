using CopyZillaBackend.API.Endpoints;
using CopyZillaBackend.Application.Features.Payment.Queries.GetSubscriptionListQuery;
using MediatR;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace CopyZillaBackend.API.Controllers
{
    [EnableCors(ApiEndpoints.Localhost)]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly IMediator _mediator;
        private readonly ILogger<ProductController> _logger;
        
        public ProductController(IMediator mediator, ILogger<ProductController> logger)
        {
            _mediator = mediator;
            _logger = logger;
        }

        [HttpGet]
        [Route(ApiEndpoints.Products.GetSubscriptionList)]
        public async Task<ActionResult<GetProductListQueryResult>> GetSubscriptionListAsync()
        {
            _logger.LogInformation("{ProductControllerName}::{GetSubscriptionListAsync}::{Now}] Invoked", nameof(ProductController), nameof(GetSubscriptionListAsync), DateTime.Now);

            var result = await _mediator.Send(new GetProductListQuery());

            return result.MapActionResult();
        }
    }
}

