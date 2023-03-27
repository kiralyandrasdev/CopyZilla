namespace CopyZillaBackend.Application.Models
{
    public class OpenAIError
    {
        public OpenAIErrorContent Error { get; set; }
    }

    public class OpenAIErrorContent
    {
        public string Message { get; set; }
        public string Type { get; set; }
        public object Param { get; set; }
        public object Code { get; set; }
    }
}
