using CopyZillaBackend.Application.Features.Prompt.ProcessAdvancedPromptEvent;
using CopyZillaBackend.Application.Features.Prompt.ProcessQuickPromptEvent;

namespace CopyZillaBackend.Application.Contracts.Prompt
{
    public interface IPromptBuilder
    {
        string Build(ProcessAdvancedPromptOptions options);
        string Build(ProcessQuickPromptOptions options);
    }
}
