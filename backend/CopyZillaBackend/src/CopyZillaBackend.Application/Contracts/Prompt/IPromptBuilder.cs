using CopyZillaBackend.Application.Features.Prompt.ProcessEmailPromptEvent;
using CopyZillaBackend.Application.Features.Prompt.ProcessRephrasePromptEvent;

namespace CopyZillaBackend.Application.Contracts.Prompt
{
    public interface IPromptBuilder
    {
        string Build(ProcessEmailPromptEventOptions options);
        string Build(ProcessRephrasePromptEventOptions options);
    }
}
