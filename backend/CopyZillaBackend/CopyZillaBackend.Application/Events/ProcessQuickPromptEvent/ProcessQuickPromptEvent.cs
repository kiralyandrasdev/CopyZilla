using CopyZillaBackend.Application.Events.ProcessQuickPromptEvent.DTO;
using MediatR;

namespace CopyZillaBackend.Application.Events.ProcessQuickPromptEvent
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
