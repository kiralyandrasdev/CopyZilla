using CopyZillaBackend.Application.Events;

namespace CopyZillaBackend.Application.Features.Prompt.ProcessEmailPromptEvent
{
    public class ProcessEmailPromptEventResult : BaseEventResult 
    {
        public string Value { get; set; }
    }
}
