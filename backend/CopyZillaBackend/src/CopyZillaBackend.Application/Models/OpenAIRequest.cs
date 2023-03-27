using Newtonsoft.Json;

namespace CopyZillaBackend.Application.Models
{
    public class OpenAIRequest
    {
        [JsonProperty("model")]
        public string Model { get; set; }

        [JsonProperty("max_tokens")]
        public int MaxTokens { get; set; }

        [JsonProperty("temperature")]
        public double Temperature { get; set; }

        [JsonProperty("messages")]
        public OpenAIRequestMessage[] Messages { get; set; }
    }

    public class OpenAIRequestMessage
    {
        [JsonProperty("role")]
        public string Role { get; set; }

        [JsonProperty("content")]
        public string Content { get; set; }
    }
}
