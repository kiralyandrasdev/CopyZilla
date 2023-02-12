using System.Diagnostics;
using CopyZillaBackend.Application.Contracts.Logging;
using CopyZillaBackend.Application.Events;
using FirebaseAdmin.Auth;
using FluentValidation;
using Newtonsoft.Json;

namespace CopyZillaBackend.API.Middlewares
{
    public class ExceptionHandlerMiddleware : IMiddleware
    {
        private readonly ICloudLogService _cloudLogService;

        public ExceptionHandlerMiddleware(ICloudLogService cloudLogService)
        {
            _cloudLogService = cloudLogService;
        }

        public async Task InvokeAsync(HttpContext context, RequestDelegate next)
        {
            try
            {
                await next(context);
            }
            catch (FirebaseAuthException ex)
            {
                context.Response.StatusCode = 401;

                var response = new BaseEventResult()
                {
                    ErrorMessage = "Invalid token.",
                };

                string log = $"Exception: {ex.Message} StackTrace: {ex.StackTrace} InnerException: {ex.InnerException?.Message} InnerException StackTrace: {ex.InnerException?.StackTrace}";
                await _cloudLogService.WriteLogAsync(log, LogLevel.Error);

                await context.Response.WriteAsync(JsonConvert.SerializeObject(response));
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

                string log = $"Exception: {ex.Message} StackTrace: {ex.StackTrace} InnerException: {ex.InnerException?.Message} InnerException StackTrace: {ex.InnerException?.StackTrace}";
                await _cloudLogService.WriteLogAsync(log, LogLevel.Error);

                await context.Response.WriteAsync(JsonConvert.SerializeObject(response));
            }
            catch (Exception ex)
            {
                Debug.WriteLine(ex);
                var response = new BaseEventResult()
                {
                    ErrorMessage = "An error occurred while processing your request. Contact support if the problem persists.",
                };
                context.Response.StatusCode = 500;

                string log = $"Exception: {ex.Message} StackTrace: {ex.StackTrace} InnerException: {ex.InnerException?.Message} InnerException StackTrace: {ex.InnerException?.StackTrace}";
                await _cloudLogService.WriteLogAsync(log, LogLevel.Critical);

                await context.Response.WriteAsync(JsonConvert.SerializeObject(response));
            }
        }
    }
}
