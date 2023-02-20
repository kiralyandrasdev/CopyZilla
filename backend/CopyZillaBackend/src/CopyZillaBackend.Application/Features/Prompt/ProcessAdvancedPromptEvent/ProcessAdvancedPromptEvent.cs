using CopyZillaBackend.Application.Features.Prompt.ProcessAdvancedPromptEvent;
using MediatR;

namespace CopyZillaBackend.Application.Events.ProcessAdvancedPromptEvent
{
    public class ProcessAdvancedPromptEvent : IRequest<ProcessAdvancedPromptEventResult>
    {
        public string FirebaseUid { get; }
        public ProcessAdvancedPromptOptions Options { get; }

        public ProcessAdvancedPromptEvent(string firebaseUid, ProcessAdvancedPromptOptions dto)
        {
            FirebaseUid = firebaseUid;
            Options = dto;
        }
    }
}
