using CopyZillaBackend.Application.Contracts.Authorization;
using CopyZillaBackend.Application.Contracts.Helpers;
using CopyZillaBackend.Application.Features.User.Commands;
using CopyZillaBackend.Application.Features.User.Queries;
using CopyZillaBackend.Domain.Entities;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace CopyZillaBackend.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IMediator _mediator;
        private readonly IConfiguration _configuration;
        private readonly IAuthorizationService _authService;
        private readonly IResponseManager _responseManager;
        private readonly ILogger<PromptController> _log;

        public UserController(IMediator mediator,
           IConfiguration configuration,
           IAuthorizationService authService,
           ILogger<PromptController> log,
           IResponseManager responseManager)
        {
            _mediator = mediator;
            _configuration = configuration;
            _authService = authService;
            _log = log;
            _responseManager = responseManager;
        }

        [HttpPost]
        [Route("{firebaseUid}")]
        public async Task<ActionResult<CreateUserCommandResponse>> CreateUserAsync(string firebaseUid,
            [FromBody] User user)
        {
            var result = await _mediator.Send(new CreateUserCommand(firebaseUid, user));

            return _responseManager.MapActionResult(result);
        }

        // TODO: implement
        [HttpGet]
        [Route("{firebaseUid}")]
        public async Task<ActionResult<GetUserQueryResponse>> GetUserAsync(string firebaseUid)
        {
            var result = await _mediator.Send(new GetUserQuery(firebaseUid));

            return _responseManager.MapActionResult(result);
        }
    }
}
