using CopyZillaBackend.Application.Events.ProcessAdvancedPromptEvent.DTO;
using MediatR;

namespace CopyZillaBackend.Application.Events.ProcessAdvancedPromptEvent
{
    public class ProcessAdvancedPromptEvent : IRequest<ProcessAdvancedPromptEventResult>
    {
        public string FirebaseUid { get; }
        public AdvancedPromptOptions Options { get; }

        public ProcessAdvancedPromptEvent(string firebaseUid, AdvancedPromptOptions dto)
        {
            FirebaseUid = firebaseUid;
            Options = dto;
        }
    }
}
