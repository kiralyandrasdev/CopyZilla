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
using CopyZillaGenerator.Function.Events.CreateTextEvent;
using CopyZillaGenerator.Function.Services;

namespace CopyZillaGenerator.Function.Functions
{
    public class TextFunction
    {
        private readonly IConfiguration _configuration;
        private readonly IAuthorizationService _authService;
        private readonly IEventService _eventService;

        public TextFunction(IConfiguration configuration, IAuthorizationService authService, IEventService eventService)
        {
            _configuration = configuration;
            _authService = authService;
            _eventService = eventService;
        }

        [FunctionName("generate")]
        public async Task<ActionResult<CreateTextEventResult>> Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "post", Route = null)][FromBody] CreateTextEventOptions options, HttpRequest req,
            ILogger log)
        {
            log.LogInformation($"[Function::Generate::{DateTime.Now.ToString()}] Invoked");

            if (!_authService.Validate(req))
                return new UnauthorizedResult();

            //string requestBody = await new StreamReader(req.Body).ReadToEndAsync();
            //CreateTextEventOptions dto = JsonConvert.DeserializeObject<CreateTextEventOptions>(requestBody);

            var @event = new CreateTextEvent(options);

            return await _eventService.Send<CreateTextEvent, CreateTextEventResult>(@event, req.HttpContext);
        }
    }
}

