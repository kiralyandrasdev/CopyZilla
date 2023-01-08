using System;
using MediatR;

namespace CopyZillaGenerator.Function.Events.ProcessAdvancedPromptEvent
{
    public class ProcessAdvancedPromptEvent : IRequest<ProcessAdvancedPromptEventResult>
    {
        public AdvancedPromptOptions Options { get; }

        public ProcessAdvancedPromptEvent(AdvancedPromptOptions dto)
        {
            Options = dto;
        }
    }
}

