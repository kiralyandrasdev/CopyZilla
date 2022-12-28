using System;
using Newtonsoft.Json;

namespace CopyZillaGenerator.Function.Events
{
    public class BaseEventResult
    {
        [JsonIgnore]
        public bool Success { get => string.IsNullOrEmpty(ErrorMessage); }
        public string ErrorMessage { get; set; }
    }
}