using CopyZillaBackend.Application.Contracts.Authorization;
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
        private readonly ILogger<PromptController> _log;

        public UserController(IMediator mediator,
           IConfiguration configuration,
           IAuthorizationService authService,
           ILogger<PromptController> log)
        {
            _mediator = mediator;
            _configuration = configuration;
            _authService = authService;
            _log = log;
        }

        //[HttpPost]
        //[Route("{firebaseUid}")]
        //public async Task<ActionResult<CreateUserCommandResponse>> CreateCustomerAsync(string firebaseUid,
        //    [FromBody] User info)
        //{
        //    var result = await _mediator.Send(new CreateUserCommand(firebaseUid, info));

        //    return _responseManager.MapActionResult(result);
        //}

        //[HttpGet]
        //[Route("{firebaseUid}")]
        //public async Task<ActionResult<GetUserQueryResponse>> GetUserAsync(string firebaseUid)
        //{
        //    var result = await _mediator.Send(new GetUserQuery(firebaseUid));

        //    return _responseManager.MapActionResult(result);
        //}
    }
}
