using MediatR;

namespace CopyZillaBackend.Application.Features.Prompt.ProcessEmailPromptEvent
{
    public class ProcessEmailPromptEvent : IRequest<ProcessEmailPromptEventResult>
    {
        public string FirebaseUid { get; }
        public ProcessEmailPromptOptions Options { get; }

        public ProcessEmailPromptEvent(string firebaseUid, ProcessEmailPromptOptions dto)
        {
            FirebaseUid = firebaseUid;
            Options = dto;
        }
    }
}
