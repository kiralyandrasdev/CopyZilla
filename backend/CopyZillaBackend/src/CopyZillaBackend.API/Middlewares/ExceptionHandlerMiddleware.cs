using CopyZillaBackend.Application.Events;
using FluentValidation;
using Newtonsoft.Json;

namespace CopyZillaBackend.API.Middlewares
{
    public class ExceptionHandlerMiddleware
    {
        private readonly RequestDelegate _next;
        // private readonly ILogger _logger;

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
            catch (ValidationException ex)
            {
                var error = ex.Errors.FirstOrDefault();

                if (int.TryParse(error?.ErrorCode, out int statusCode))
                    context.Response.StatusCode = statusCode;
                else
                    context.Response.StatusCode = 400;

                var response = new BaseEventResult()
                {
                    ErrorMessage = error?.ErrorMessage ?? ex.Message,
                };

                await context.Response.WriteAsync(JsonConvert.SerializeObject(response));
            }
            catch (Exception _)
            {
                context.Response.StatusCode = 500;
                await context.Response.WriteAsync("Internal server error.");
            }
        }
    }
}
