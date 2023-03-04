using CopyZillaBackend.API.Exceptions;
using FirebaseAdmin;
using FirebaseAdmin.Auth;

namespace CopyZillaBackend.API.Middlewares
{
    public class InternalAuthorizationMiddleware : IMiddleware
    {
        private readonly IConfiguration _configuration;

        public InternalAuthorizationMiddleware(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public async Task InvokeAsync(HttpContext context, RequestDelegate next)
        {
            // Ignore authorization in development.
            if (_configuration.GetValue<string>("ASPNETCORE_ENVIRONMENT") == "Development")
            {
                await next(context);
                return;
            }

            // Check if we have a header.
            if (!context.Request.Headers.ContainsKey("Authorization"))
                throw new AuthException("Authorization header is missing.");

            string authorizationHeader = context.Request.Headers["Authorization"]!;

            // Check if the value is empty.
            if (string.IsNullOrEmpty(authorizationHeader) || !authorizationHeader.StartsWith("Bearer "))
                throw new AuthException("Authorization header is missing.");

            // Check if the token is valid.
            await FirebaseAuth.GetAuth(FirebaseApp.GetInstance("internal")).VerifyIdTokenAsync(authorizationHeader.Replace("Bearer ", ""));

            await next(context);
        }
    }
}
