using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;

namespace CopyZillaBackend.API.Json
{
    public class ApplicationJsonSerializerSettings : JsonSerializerSettings
    {
        public ApplicationJsonSerializerSettings()
        {
            NullValueHandling = NullValueHandling.Ignore;
            ContractResolver = new CamelCasePropertyNamesContractResolver();
        }
    }
}