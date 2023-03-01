namespace CopyZillaBackend.Application.Features.Prompt.ProcessEmailPromptEvent
{
    public class ProcessEmailPromptOptions
    {
        public string Email { get; set; }
        public string? Objective { get; set; }
        public string? Tone { get; set; } = "neutral";
        public string? Instructions { get; set; }
    }
}
