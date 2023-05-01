using CopyZillaBackend.API.Endpoints;
using CopyZillaBackend.Application.Features.Internal.Queries;
using CopyZillaBackend.Application.Features.Internal.Queries.GetLogListQuery;
using CopyZillaBackend.Application.Features.Internal.Queries.GetLogQuery;
using MediatR;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace CopyZillaBackend.API.Controllers
{
    [EnableCors(ApiEndpoints.Localhost)]
    [ApiController]
    public class InternalController : ControllerBase
    {
        private readonly IMediator _mediator;
        private readonly ILogger<InternalController> _logger;
        
        public InternalController(IMediator mediator, ILogger<InternalController> logger)
        {
            _mediator = mediator;
            _logger = logger;
        }

        [HttpGet]
        [Route(ApiEndpoints.Internal.GetUsers)]
        public async Task<ActionResult<GetUserListQueryResult>> GetUsersAsync()
        {
            _logger.LogInformation("{InternalControllerName}::{GetUsersAsync}::{Now}] Invoked", nameof(InternalController), nameof(GetUsersAsync), DateTime.Now);

            var result = await _mediator.Send(new GetUserListQuery());

            return result.MapActionResult();
        }

        [HttpGet]
        [Route(ApiEndpoints.Internal.GetLogList)]
        public async Task<ActionResult<GetLogListQueryResult>> GetLogListAsync(string type)
        {
            _logger.LogInformation("{InternalControllerName}::{GetLogListAsync}::{Now}] Invoked", nameof(InternalController), nameof(GetLogListAsync), DateTime.Now);

            var result = await _mediator.Send(new GetLogListQuery(type ?? "error"));

            return result.MapActionResult();
        }

        [HttpGet]
        [Route(ApiEndpoints.Internal.GetLog)] 
        public async Task<ActionResult<GetLogQueryResult>> GetLogAsync(string type, string fileName)
        {
            _logger.LogInformation("{InternalControllerName}::{GetLogAsync}::{Now}] Invoked", nameof(InternalController), nameof(GetLogAsync), DateTime.Now);

            var result = await _mediator.Send(new GetLogQuery(type, fileName));

            return result.MapActionResult();
        }
    }
}