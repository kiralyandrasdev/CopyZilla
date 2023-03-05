using Microsoft.AspNetCore.Http;

namespace CopyZillaBackend.Application.Contracts.Logging
{
    public interface ICloudLogBuilder
    {
        string BuildErrorLog(HttpContext httpContext, Exception ex, string clientType = "", string userEmail = ""); 
    }
}