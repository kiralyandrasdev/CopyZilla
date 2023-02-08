using System.Text.Json.Serialization;

namespace CopyZillaBackend.Application.Events
{
    public class BaseEventResult 
    {
        [JsonIgnore]
        public bool Success { get => string.IsNullOrEmpty(ErrorMessage); }

        public string ErrorMessage { get; set; }

        public string StatusCode { get; set; }
    }
}
