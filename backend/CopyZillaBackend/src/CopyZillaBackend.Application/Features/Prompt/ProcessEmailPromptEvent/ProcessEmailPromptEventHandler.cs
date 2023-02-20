using MediatR;

namespace CopyZillaBackend.Application.Features.Prompt.ProcessEmailPromptEvent
{
    public class ProcessEmailPromptEventHandler : IRequestHandler<ProcessEmailPromptEvent, ProcessEmailPromptEventResult>
    {
        public Task<ProcessEmailPromptEventResult> Handle(ProcessEmailPromptEvent request, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }
    }
}
