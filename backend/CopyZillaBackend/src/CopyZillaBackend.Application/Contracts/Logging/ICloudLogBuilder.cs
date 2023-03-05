using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;

namespace CopyZillaBackend.Application.Contracts.Logging
{
    public interface ICloudLogBuilder
    {
        string BuildErrorLog(HttpContext httpContext, Exception ex, string clientType = "", string userEmail = ""); 
    }
}