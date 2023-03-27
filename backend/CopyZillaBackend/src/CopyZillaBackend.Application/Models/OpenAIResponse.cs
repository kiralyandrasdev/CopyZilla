using Newtonsoft.Json;

namespace CopyZillaBackend.Application.Models
{
    public class OpenAIResponse
    {
        [JsonProperty("id")]
        public string Id { get; set; }

        [JsonProperty("created")]
        public int Created { get; set; }

        [JsonProperty("model")]
        public string Model { get; set; }

        [JsonProperty("usage")]
        public OpenAIResponseUsage Usage { get; set; }

        [JsonProperty("choices")]
        public OpenAIResponseChoice[] Choices { get; set; }
    }

    public class OpenAIResponseUsage
    {
        [JsonProperty("prompt_tokens")]
        public int PromptTokens { get; set; }

        [JsonProperty("completion_tokens")]
        public int CompletionTokens { get; set; }

        [JsonProperty("total_tokens")]
        public int TotalTokens { get; set; }
    }

    public class OpenAIResponseChoice
    {
        [JsonProperty("message")]
        public OpenAIResponseMessage Message { get; set; }

        [JsonProperty("finish_reason")]
        public string FinishReason { get; set; }

        [JsonProperty("index")]
        public int Index { get; set; }
    }

    public class OpenAIResponseMessage
    {
        [JsonProperty("role")]
        public string Role { get; set; }

        [JsonProperty("content")]
        public string Content { get; set; }
    }
}
