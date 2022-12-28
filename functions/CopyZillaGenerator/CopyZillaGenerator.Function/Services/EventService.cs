using System;
using System.Net;
using System.Threading.Tasks;
using CopyZillaGenerator.Function.Events;
using CopyZillaGenerator.Function.Exceptions;
using CopyZillaGenerator.Function.Functions;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace CopyZillaGenerator.Function.Services
{
	public class EventService : ControllerBase, IEventService
	{
        private readonly ILogger _log;
		private readonly IMediator _mediator;
        private readonly ResponseManager _responseManager;

        public EventService(ILogger log, IMediator mediator)
        {
            _log = log;
            _mediator = mediator;

            _responseManager = new ResponseManager();
        }

        public async Task<ActionResult<TResult>> Send<TEvent, TResult>(TEvent @event, HttpContext context)
            where TEvent : IRequest<TResult>
            where TResult : BaseEventResult
        {
            try
            {
                var response = await _mediator.Send(@event);
                return _responseManager.MapActionResult(response as TResult);
            } catch (OpenAIException ex)
            {
                _log.LogInformation($"[Function::Generate::{DateTime.Now.ToString()}] Internal server error occured: {ex.Message}");
                context.Response.StatusCode = 500;
                return new BadRequestObjectResult(new BaseEventResult() { ErrorMessage = ex.Message });
            } catch (Exception ex)
            {
                _log.LogInformation($"[Function::Generate::{DateTime.Now.ToString()}] Internal server error occured: {ex.Message}");
                context.Response.StatusCode = 500;
                return new ObjectResult(new BaseEventResult() { ErrorMessage = ex.Message });
            }
        }
    }
}

