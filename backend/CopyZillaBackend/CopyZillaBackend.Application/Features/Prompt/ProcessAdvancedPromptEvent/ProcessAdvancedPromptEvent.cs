using CopyZillaBackend.Application.Events.ProcessAdvancedPromptEvent.DTO;
using MediatR;

namespace CopyZillaBackend.Application.Events.ProcessAdvancedPromptEvent
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
