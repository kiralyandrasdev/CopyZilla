using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using Microsoft.Extensions.Configuration;
using CopyZillaGenerator.Function.Events.ProcessQuickPromptEvent;
using CopyZillaGenerator.Function.Services;
using CopyZillaGenerator.Function.Events.ProcessAdvancedPromptEvent;

namespace CopyZillaGenerator.Function.Functions
{
    public class PromptFunction
    {
        private readonly IConfiguration _configuration;
        private readonly IAuthorizationService _authService;
        private readonly IEventService _eventService;

        public PromptFunction(IConfiguration configuration, IAuthorizationService authService, IEventService eventService)
        {
            _configuration = configuration;
            _authService = authService;
            _eventService = eventService;
        }

        [FunctionName("quickPrompt")]
        public async Task<ActionResult<ProcessQuickPromptEventResult>> SendQuickPrompt(
            [HttpTrigger(AuthorizationLevel.Anonymous, "post", Route = null)][FromBody] QuickPromptOptions options, HttpRequest req,
            ILogger log)
        {
            log.LogInformation($"[Function::quickPrompt::{DateTime.Now.ToString()}] Invoked");

            //if (!_authService.Validate(req))
            //    return new UnauthorizedResult();

            //string requestBody = await new StreamReader(req.Body).ReadToEndAsync();
            //CreateTextEventOptions dto = JsonConvert.DeserializeObject<CreateTextEventOptions>(requestBody);

            var @event = new ProcessQuickPromptEvent(options);

            return await _eventService.Send<ProcessQuickPromptEvent, ProcessQuickPromptEventResult>(@event, req.HttpContext);
        }

        [FunctionName("advancedPrompt")]
        public async Task<ActionResult<ProcessAdvancedPromptEventResult>> SendAdvancedPrompt(
            [HttpTrigger(AuthorizationLevel.Anonymous, "post", Route = null)][FromBody] AdvancedPromptOptions options, HttpRequest req,
            ILogger log)
        {
            log.LogInformation($"[Function::quickPrompt::{DateTime.Now.ToString()}] Invoked");

            //if (!_authService.Validate(req))
            //    return new UnauthorizedResult();

            //string requestBody = await new StreamReader(req.Body).ReadToEndAsync();
            //CreateTextEventOptions dto = JsonConvert.DeserializeObject<CreateTextEventOptions>(requestBody);

            var @event = new ProcessAdvancedPromptEvent(options);

            return await _eventService.Send<ProcessAdvancedPromptEvent, ProcessAdvancedPromptEventResult>(@event, req.HttpContext);
        }
    }
}

