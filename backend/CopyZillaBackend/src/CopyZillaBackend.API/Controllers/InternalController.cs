using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CopyZillaBackend.API.Helpers;
using CopyZillaBackend.Application.Contracts.Helpers;
using CopyZillaBackend.Application.Features.Internal.Queries;
using CopyZillaBackend.Application.Features.Internal.Queries.GetLogListQuery;
using CopyZillaBackend.Application.Features.Internal.Queries.GetLogQuery;
using MediatR;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace CopyZillaBackend.API.Controllers
{
    [EnableCors("localhost")]
    [Route("api/[controller]")]
    [ApiController]
    public class InternalController : ControllerBase
    {
        private readonly IResponseManager _responseManager;
        private readonly IMediator _mediator;
        private readonly IConfiguration _configuration;

        public InternalController(IResponseManager responseManager, IMediator mediator,
           IConfiguration configuration)
        {
            _responseManager = responseManager;
            _mediator = mediator;
            _configuration = configuration;
        }

        [HttpGet]
        [Route("users")]
        public async Task<ActionResult<GetUserListQueryResult>> GetUsersAsync()
        {
            var result = await _mediator.Send(new GetUserListQuery());

            return _responseManager.MapActionResult(result);
        }

        [HttpGet]
        [Route("logs/{type}")]
        public async Task<ActionResult<GetLogListQueryResult>> GetUserAsync(string type)
        {
            var result = await _mediator.Send(new GetLogListQuery(type ?? "error"));

            return _responseManager.MapActionResult(result);
        }

        [HttpGet]
        [Route("logs/{type}/{fileName}")]
        public async Task<ActionResult<GetLogQueryResult>> GetUserAsync(string type, string fileName)
        {
            var result = await _mediator.Send(new GetLogQuery(type, fileName));

            return _responseManager.MapActionResult(result);
        }
    }
}