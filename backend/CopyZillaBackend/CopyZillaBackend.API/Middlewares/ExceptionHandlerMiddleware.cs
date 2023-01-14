using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace CopyZillaBackend.API.Middlewares
{
    // TODO: implement
    public class ExceptionHandlerMiddleware
    {
        private readonly RequestDelegate _next;

        public ExceptionHandlerMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            try
            {
                await _next(context);
            }
            catch (Exception ex)
            {
                await context.Response.WriteAsync(JsonConvert.SerializeObject(
                        new
                        {
                            ErrorMessage = ex.Message,
                        })
                    );
                context.Response.StatusCode = 500;
                //await HandleExceptionAsync(context, ex);
            }
        }
    }
}
