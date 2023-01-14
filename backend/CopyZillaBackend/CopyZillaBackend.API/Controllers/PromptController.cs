using CopyZillaBackend.Application.Events.ProcessAdvancedPromptEvent;
using CopyZillaBackend.Application.Events.ProcessAdvancedPromptEvent.DTO;
using CopyZillaBackend.Application.Events.ProcessQuickPromptEvent;
using CopyZillaBackend.Application.Events.ProcessQuickPromptEvent.DTO;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CopyZillaBackend.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PromptController : ControllerBase
    {
        private readonly IMediator _mediator;
        private readonly IConfiguration _configuration;
        private readonly IAuthorizationService _authService;
        private readonly ILogger<PromptController> _log;

        public PromptController(IMediator mediator,
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
        //[Route("quickPrompt")]
        //public async Task<ActionResult<ProcessQuickPromptEventResult>> SendQuickPromptAsync([FromBody] QuickPromptOptions options)
        //{
        //    _log.LogInformation($"[PromptController::SendQuickPromptAsync::{DateTime.Now.ToString()}] Invoked");

        //    //if (!_authService.Validate(req))
        //    //    return new UnauthorizedResult();

        //    //string requestBody = await new StreamReader(req.Body).ReadToEndAsync();
        //    //CreateTextEventOptions dto = JsonConvert.DeserializeObject<CreateTextEventOptions>(requestBody);

        //    return await _mediator.Send(new ProcessQuickPromptEvent(options));
        //}

        //[HttpPost]
        //[Route("advancedPrompt")]
        //public async Task<ActionResult<ProcessAdvancedPromptEventResult>> SendAdvancedPromptAsync([FromBody] AdvancedPromptOptions options)
        //{
        //    _log.LogInformation($"[PromptController::SendAdvancedPromptAsync::{DateTime.Now.ToString()}] Invoked");

        //    //if (!_authService.Validate(req))
        //    //    return new UnauthorizedResult();

        //    //string requestBody = await new StreamReader(req.Body).ReadToEndAsync();
        //    //CreateTextEventOptions dto = JsonConvert.DeserializeObject<CreateTextEventOptions>(requestBody);

        //    return await _mediator.Send(new ProcessAdvancedPromptEvent(options));
        //}
    }
}
