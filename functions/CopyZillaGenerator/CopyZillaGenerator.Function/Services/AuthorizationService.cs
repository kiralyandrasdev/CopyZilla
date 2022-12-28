using System;
using Microsoft.AspNetCore.Http;
using System.Collections.Generic;
using System.Data;
using JWT.Builder;
using JWT.Algorithms;
using Microsoft.Extensions.Configuration;

namespace CopyZillaGenerator.Function.Services
{
    public class AuthorizationService : IAuthorizationService
    {
        private readonly IConfiguration _configuration;

        public AuthorizationService(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public bool Validate(HttpRequest request)
        {
            var isDevelopment = _configuration.GetValue<string>("Environment") == "Development";
            if (isDevelopment)
                return true;

            // Check if we have a header.
            if (!request.Headers.ContainsKey("Authorization"))
                return false;

            string authorizationHeader = request.Headers["Authorization"];

            // Check if the value is empty.
            if (string.IsNullOrEmpty(authorizationHeader) || !authorizationHeader.StartsWith("Bearer "))
                return false;

            // Check if we can decode the header.
            IDictionary<string, object> claims = null;
            try
            {
                authorizationHeader = authorizationHeader.Substring(7);

                var jwtTokenKey = _configuration.GetValue<string>("JwtTokenKey");

                // Validate the token and decode the claims.
                claims = new JwtBuilder()
                    .WithAlgorithm(new HMACSHA256Algorithm())
                    .WithSecret(jwtTokenKey)
                    .MustVerifySignature()
                    .Decode<IDictionary<string, object>>(authorizationHeader);
            }
            catch (Exception exception)
            {
                return false;
            }

            // Check if we have user claim.
            if (!claims.ContainsKey("email"))
            {
                return false;
            }

            return true;
        }
    }
}

