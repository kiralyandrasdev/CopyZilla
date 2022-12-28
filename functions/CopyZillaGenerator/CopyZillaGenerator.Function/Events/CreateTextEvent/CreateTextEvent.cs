using System;
using CopyZillaGenerator.Function.Events.CreateTextEvent;
using MediatR;

namespace CopyZillaGenerator.Function.Events.CreateTextEvent
{
	public class CreateTextEvent : IRequest<CreateTextEventResult>
	{
		public CreateTextEventOptions Options { get; }

        public CreateTextEvent(CreateTextEventOptions dto)
        {
            Options = dto;
        }
    }
}

