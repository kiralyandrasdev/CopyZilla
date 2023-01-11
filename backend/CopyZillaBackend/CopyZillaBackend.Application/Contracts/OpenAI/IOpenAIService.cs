namespace CopyZillaBackend.Application.Contracts.OpenAI
{
    public interface IOpenAIService
    {
        Task<string> ProcessPrompt(string prompt);
    }
}
