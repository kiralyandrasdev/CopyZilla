using CopyZillaBackend.Application.Contracts.Authorization;
using CopyZillaBackend.Application.Contracts.Helpers;
using CopyZillaBackend.Application.Events.ProcessAdvancedPromptEvent;
using CopyZillaBackend.Application.Events.ProcessAdvancedPromptEvent.DTO;
using CopyZillaBackend.Application.Events.ProcessQuickPromptEvent;
using CopyZillaBackend.Application.Events.ProcessQuickPromptEvent.DTO;
using CopyZillaBackend.Application.Features.User.Commands.CreateUserCommand;
using CopyZillaBackend.Application.Features.User.Queries.GetUserQuery;
using CopyZillaBackend.Domain.Entities;
using MediatR;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace CopyZillaBackend.API.Controllers
{
    [EnableCors("localhost")]
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
           IResponseManager responseManager,
           ILogger<PromptController> log)
        {
            _mediator = mediator;
            _configuration = configuration;
            _authService = authService;
            _responseManager = responseManager;
            _log = log;
        }

        [HttpPost]
        public async Task<ActionResult<CreateUserCommandResult>> CreateCustomerAsync([FromBody] CreateUserCommandOptions options)
        {
            var result = await _mediator.Send(new CreateUserCommand(options));

            return _responseManager.MapActionResult(result);
        }

        [HttpGet]
        [Route("{firebaseUid}")]
        public async Task<ActionResult<GetUserQueryResult>> GetUserAsync(string firebaseUid)
        {
            var result = await _mediator.Send(new GetUserQuery(firebaseUid));

            return _responseManager.MapActionResult(result);
        }

        [HttpPost]
        [Route("{userId}/quickPrompt")]
        public async Task<ActionResult<ProcessQuickPromptEventResult>> SendQuickPromptAsync(string userId, [FromBody] QuickPromptOptions options)
        {
            _log.LogInformation($"[PromptController::SendQuickPromptAsync::{DateTime.Now.ToString()}] Invoked");

            //if (!_authService.Validate(req))
            //    return new UnauthorizedResult();

            //string requestBody = await new StreamReader(req.Body).ReadToEndAsync();
            //CreateTextEventOptions dto = JsonConvert.DeserializeObject<CreateTextEventOptions>(requestBody);

            return await _mediator.Send(new ProcessQuickPromptEvent(options));
        }

        [HttpPost]
        [Route("{userId}/advancedPrompt")]
        public async Task<ActionResult<ProcessAdvancedPromptEventResult>> SendAdvancedPromptAsync(string userId, [FromBody] AdvancedPromptOptions options)
        {
            _log.LogInformation($"[PromptController::SendAdvancedPromptAsync::{DateTime.Now.ToString()}] Invoked");

            //if (!_authService.Validate(req))
            //    return new UnauthorizedResult();

            //string requestBody = await new StreamReader(req.Body).ReadToEndAsync();
            //CreateTextEventOptions dto = JsonConvert.DeserializeObject<CreateTextEventOptions>(requestBody);

            return await _mediator.Send(new ProcessAdvancedPromptEvent(options));
        }
    }
}