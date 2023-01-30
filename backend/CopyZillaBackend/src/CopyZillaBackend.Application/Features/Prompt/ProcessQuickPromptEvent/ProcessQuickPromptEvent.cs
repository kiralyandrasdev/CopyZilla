using CopyZillaBackend.Application.Events.ProcessQuickPromptEvent.DTO;
using MediatR;

namespace CopyZillaBackend.Application.Events.ProcessQuickPromptEvent
{
    public class ProcessQuickPromptEvent : IRequest<ProcessQuickPromptEventResult>
    {
        public string FirebaseUid { get; }
        public QuickPromptOptions Options { get; }

        public ProcessQuickPromptEvent(string firebaseUid, QuickPromptOptions dto)
        {
            FirebaseUid = firebaseUid;
            Options = dto;
        }
    }
}
