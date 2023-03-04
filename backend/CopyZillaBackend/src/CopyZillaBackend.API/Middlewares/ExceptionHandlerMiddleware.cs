using System.Diagnostics;
using CopyZillaBackend.API.Exceptions;
using CopyZillaBackend.API.Json;
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
        private readonly IConfiguration _configuration;

        public ExceptionHandlerMiddleware(ICloudLogService cloudLogService, IConfiguration configuration)
        {
            _cloudLogService = cloudLogService;
            _configuration = configuration;
        }

        public async Task InvokeAsync(HttpContext context, RequestDelegate next)
        {
            try
            {
                await next(context);
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
                
                if (_configuration.GetValue<string>("ASPNETCORE_ENVIRONMENT") != "Development")
                    await _cloudLogService.WriteLogAsync(log, LogLevel.Error);

                await context.Response.WriteAsync(JsonConvert.SerializeObject(response, new ApplicationJsonSerializerSettings()));
            }
            catch (Exception ex)
            {
                var response = new BaseEventResult();
                string log = $"Exception: {ex.Message} StackTrace: {ex.StackTrace} InnerException: {ex.InnerException?.Message} InnerException StackTrace: {ex.InnerException?.StackTrace}";

                if (ex is AuthException || ex is FirebaseAuthException)
                {
                    context.Response.StatusCode = 401;
                    response.ErrorMessage = ex.Message;

                    await _cloudLogService.WriteLogAsync(log, LogLevel.Error);

                    await context.Response.WriteAsync(JsonConvert.SerializeObject(response, new ApplicationJsonSerializerSettings()));
                    return;
                }

                Debug.WriteLine(ex);

                context.Response.StatusCode = 500;
                response.ErrorMessage = "An error occurred while processing your request. Contact support if the problem persists.";

                if (_configuration.GetValue<string>("ASPNETCORE_ENVIRONMENT") != "Development")
                    await _cloudLogService.WriteLogAsync(log, LogLevel.Critical);

                await context.Response.WriteAsync(JsonConvert.SerializeObject(response, new ApplicationJsonSerializerSettings()));
            }
        }
    }
}
