using CopyZillaBackend.Application.Features.Prompt.ProcessAdvancedPromptEvent;
using CopyZillaBackend.Application.Features.Prompt.ProcessEmailPromptEvent;
using CopyZillaBackend.Application.Features.Prompt.ProcessQuickPromptEvent;
using CopyZillaBackend.Application.Features.Prompt.ProcessRephrasePromptEvent;

namespace CopyZillaBackend.Application.Contracts.Prompt
{
    public interface IPromptBuilder
    {
        string Build(ProcessAdvancedPromptOptions options);
        string Build(ProcessQuickPromptOptions options);
        string Build(ProcessEmailPromptOptions options);
        string Build(ProcessRephrasePromptEventOptions options);
    }
}
