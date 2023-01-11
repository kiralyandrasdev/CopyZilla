using CopyZillaBackend.Application.Events.ProcessAdvancedPromptEvent.DTO;
using CopyZillaBackend.Application.Events.ProcessQuickPromptEvent.DTO;

namespace CopyZillaBackend.Application.Contracts.Prompt
{
    public interface IPromptBuilder
    {
        string Build(AdvancedPromptOptions options);
        string Build(QuickPromptOptions options);
    }
}
