using CopyZillaBackend.Application.Contracts.Logging;
using Microsoft.AspNetCore.Http;

namespace CopyZillaBackend.Infrastructure.Logging
{
    public class CloudLogBuilder : ICloudLogBuilder
    {
        public string BuildErrorLog(HttpContext httpContext, Exception ex, string clientType = "", string userEmail = "")
        {
            var log = new List<string>
            {
                $"User: {userEmail}",
                $"Client: {clientType}",
                $"Request: {httpContext.Request.Method} {httpContext.Request.Path}",
                $"Exception: {ex.Message}",
                $"Stack Trace: {ex.StackTrace}"
            };

            return string.Join(Environment.NewLine, log);
        }
    }
}