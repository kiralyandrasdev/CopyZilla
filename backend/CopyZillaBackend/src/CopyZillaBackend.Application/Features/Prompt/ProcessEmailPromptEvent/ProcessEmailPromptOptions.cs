namespace CopyZillaBackend.Application.Features.Prompt.ProcessEmailPromptEvent
{
    public class ProcessEmailPromptOptions
    {
        public string Recipient { get; set; }
        public string Sender { get; set; }
        public string CurrentEmail { get; set; }
        public string Objective { get; set; }
        public string? PreviousEmail { get; set; }
        public string? Length { get; set; }
        public string? Mood { get; set; }
        public string? Instructions { get; set; }
    }
}
