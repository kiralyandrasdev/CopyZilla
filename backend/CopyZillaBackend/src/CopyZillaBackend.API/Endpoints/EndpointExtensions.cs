using CopyZillaBackend.API.Endpoints.Users;
using CopyZillaBackend.Application;
using Microsoft.AspNetCore.Mvc;

namespace CopyZillaBackend.API.Endpoints;

public static class EndpointExtensions
{
    public static IEndpointRouteBuilder MapApiEndpoints(this IEndpointRouteBuilder app)
    {
        app.MapUserEndpoints();
        return app;
    }
    
    public static ActionResult<T> MapActionResult<T>(this T response) where T : BaseEventResult
    {
        if (!string.IsNullOrEmpty(response.ErrorMessage))
        {
            return new BadRequestObjectResult(response);
        }

        return new OkObjectResult(response);
    }
}