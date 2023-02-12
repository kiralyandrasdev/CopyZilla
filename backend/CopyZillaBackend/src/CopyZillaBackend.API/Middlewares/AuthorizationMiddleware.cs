using FirebaseAdmin.Auth;
using JWT.Algorithms;
using JWT.Builder;

namespace CopyZillaBackend.API.Middlewares
{
    // TODO: implement
    public class AuthorizationMiddleware : IMiddleware
    {
        private readonly IConfiguration _configuration;

        public AuthorizationMiddleware(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public async Task InvokeAsync(HttpContext context, RequestDelegate next)
        {
            if (_configuration.GetValue<string>("ASPNETCORE_ENVIRONMENT") == "Development")
            {
                await next(context);
                return;
            }

            // Check if we have a header.
            if (!context.Request.Headers.ContainsKey("Authorization"))
                throw new Exception("Authorization header is missing.");

            string authorizationHeader = context.Request.Headers["Authorization"]!;

            // Check if the value is empty.
            if (string.IsNullOrEmpty(authorizationHeader) || !authorizationHeader.StartsWith("Bearer "))
                throw new Exception("Authorization header is missing.");

            await FirebaseAuth.DefaultInstance.VerifyIdTokenAsync(authorizationHeader.Replace("Bearer ", ""));

            await next(context);
        }
    }
}
