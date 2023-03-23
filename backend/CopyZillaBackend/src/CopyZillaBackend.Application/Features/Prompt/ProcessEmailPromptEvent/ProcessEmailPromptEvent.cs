using MediatR;

namespace CopyZillaBackend.Application.Features.Prompt.ProcessEmailPromptEvent
{
    public class ProcessEmailPromptEvent : IRequest<ProcessEmailPromptEventResult>
    {
        public Guid UserId { get; }
        public ProcessEmailPromptEventOptions Options { get; }

        public ProcessEmailPromptEvent(Guid userId, ProcessEmailPromptEventOptions dto)
        {
            UserId = userId;
            Options = dto;
        }
    }
}
