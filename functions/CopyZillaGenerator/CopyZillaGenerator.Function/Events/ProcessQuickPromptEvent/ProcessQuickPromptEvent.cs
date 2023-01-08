using System;
using CopyZillaGenerator.Function.Events.ProcessQuickPromptEvent;
using MediatR;

namespace CopyZillaGenerator.Function.Events.ProcessQuickPromptEvent
{
	public class ProcessQuickPromptEvent : IRequest<ProcessQuickPromptEventResult>
	{
		public QuickPromptOptions Options { get; }

        public ProcessQuickPromptEvent(QuickPromptOptions dto)
        {
            Options = dto;
        }
    }
}

