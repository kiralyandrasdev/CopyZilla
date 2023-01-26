using CopyZillaBackend.Application.Contracts.Authorization;
using CopyZillaBackend.Application.Contracts.Helpers;
using CopyZillaBackend.Application.Events.ProcessAdvancedPromptEvent;
using CopyZillaBackend.Application.Events.ProcessAdvancedPromptEvent.DTO;
using CopyZillaBackend.Application.Events.ProcessQuickPromptEvent;
using CopyZillaBackend.Application.Events.ProcessQuickPromptEvent.DTO;
using CopyZillaBackend.Application.Features.User.Commands.CreateUserCommand;
using CopyZillaBackend.Application.Features.User.Commands.DeletePromptResultCommand;
using CopyZillaBackend.Application.Features.User.Commands.SavePromptResultCommand;
using CopyZillaBackend.Application.Features.User.Queries.GetSavedPromptResultListQuery;
using CopyZillaBackend.Application.Features.User.Queries.GetUserQuery;
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
        private readonly ILogger<UserController> _log;

        public UserController(IMediator mediator,
           IConfiguration configuration,
           IAuthorizationService authService,
           IResponseManager responseManager,
           ILogger<UserController> log)
        {
            _mediator = mediator;
            _configuration = configuration;
            _authService = authService;
            _responseManager = responseManager;
            _log = log;
        }

        [HttpGet]
        [Route("{firebaseUid}")]
        public async Task<ActionResult<GetUserQueryResult>> GetUserAsync(string firebaseUid)
        {
            var result = await _mediator.Send(new GetUserQuery(firebaseUid));

            return _responseManager.MapActionResult(result);
        }

        [HttpPost]
        public async Task<ActionResult<CreateUserCommandResult>> CreateCustomerAsync([FromBody] CreateUserCommandOptions options)
        {
            var result = await _mediator.Send(new CreateUserCommand(options));

            return _responseManager.MapActionResult(result);
        }

        /// <summary>
        /// TODO: Implement user update endpoint: email address (stripe, db)
        /// </summary>
        /// <param name="userId"></param>
        /// <returns></returns>

        [HttpGet]
        [Route("{userId}/promptResults")]
        public async Task<ActionResult<GetSavedPromptResultListQueryResult>> GetSavedPromptResultListAsync(Guid userId)
        {
            var result = await _mediator.Send(new GetSavedPromptResultListQuery(userId));

            return _responseManager.MapActionResult(result);
        }

        [HttpPost]
        [Route("{userId}/promptResults")]
        public async Task<ActionResult<SavePromptResultCommandResult>> SavePromptResultAsync(Guid userId, [FromBody] SavePromptResultCommandOptions options)
        {
            var result = await _mediator.Send(new SavePromptResultCommand(userId, options));

            return _responseManager.MapActionResult(result);
        }

        [HttpDelete]
        [Route("{userId}/promptResults/{promptResultId}")]
        public async Task<ActionResult<DeletePromptResultCommandResult>> DeletePromptResultAsync(Guid userId, Guid promptResultId)
        {
            var result = await _mediator.Send(new DeletePromptResultCommand(userId, promptResultId));

            return _responseManager.MapActionResult(result);
        }

        [HttpPost]
        [Route("{firebaseUid}/quickPrompt")]
        public async Task<ActionResult<ProcessQuickPromptEventResult>> SendQuickPromptAsync(string firebaseUid, [FromBody] QuickPromptOptions options)
        {
            _log.LogInformation($"[PromptController::SendQuickPromptAsync::{DateTime.Now.ToString()}] Invoked");

            return await _mediator.Send(new ProcessQuickPromptEvent(firebaseUid, options));
        }

        [HttpPost]
        [Route("{firebaseUid}/advancedPrompt")]
        public async Task<ActionResult<ProcessAdvancedPromptEventResult>> SendAdvancedPromptAsync(string firebaseUid, [FromBody] AdvancedPromptOptions options)
        {
            _log.LogInformation($"[PromptController::SendAdvancedPromptAsync::{DateTime.Now.ToString()}] Invoked");

            return await _mediator.Send(new ProcessAdvancedPromptEvent(firebaseUid, options));
        }
    }
}