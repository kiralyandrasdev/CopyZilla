using CopyZillaBackend.Application.Features.Prompt.ProcessQuickPromptEvent;
using MediatR;

namespace CopyZillaBackend.Application.Events.ProcessQuickPromptEvent
{
    public class ProcessQuickPromptEvent : IRequest<ProcessQuickPromptEventResult>
    {
        public string FirebaseUid { get; }
        public ProcessQuickPromptOptions Options { get; }

        public ProcessQuickPromptEvent(string firebaseUid, ProcessQuickPromptOptions dto)
        {
            FirebaseUid = firebaseUid;
            Options = dto;
        }
    }
}
