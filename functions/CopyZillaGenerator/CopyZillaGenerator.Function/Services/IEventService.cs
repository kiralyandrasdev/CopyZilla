using System;
using System.Threading.Tasks;
using CopyZillaGenerator.Function.Events;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CopyZillaGenerator.Function.Services
{
    public interface IEventService
    {
        Task<ActionResult<TResult>> Send<TEvent, TResult>(TEvent @event, HttpContext context)
            where TEvent : IRequest<TResult> where TResult : BaseEventResult;
    }
}

