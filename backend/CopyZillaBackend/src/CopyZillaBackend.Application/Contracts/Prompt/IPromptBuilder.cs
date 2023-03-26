using CopyZillaBackend.Application.Features.Prompt.ProcessEmailPromptEvent;
using CopyZillaBackend.Application.Features.Prompt.ProcessRephrasePromptEvent;

namespace CopyZillaBackend.Application.Contracts.Prompt
{
    public interface IPromptBuilder
    {
        string BuildEmailPrompt(string language, ProcessEmailPromptEventOptions options);
        string BuildRephrasePrompt(ProcessRephrasePromptEventOptions options);
        string BuildGetLanguagePrompt(string email);
    }
}
