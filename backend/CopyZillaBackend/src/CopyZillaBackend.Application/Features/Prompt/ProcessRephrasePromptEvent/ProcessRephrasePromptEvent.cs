using MediatR;

namespace CopyZillaBackend.Application.Features.Prompt.ProcessRephrasePromptEvent
{
    public class ProcessRephrasePromptEvent : IRequest<ProcessRephrasePromptEventResult>
    {
        public Guid UserId { get; }
        public ProcessRephrasePromptEventOptions Options { get; }

        public ProcessRephrasePromptEvent(Guid userId, ProcessRephrasePromptEventOptions options)
        {
            UserId = userId;
            Options = options;
        }
    }
}