using CopyZillaBackend.Application.Events;

namespace CopyZillaBackend.Application.Features.Prompt.ProcessRephrasePromptEvent
{
    public class ProcessRephrasePromptEventResult : BaseEventResult
    {
        public string Value { get; set; }
    }
}