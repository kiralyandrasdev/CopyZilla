using CopyZillaGenerator.Function;
using CopyZillaGenerator.Function.Services;
using MediatR;
using Microsoft.Azure.Functions.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection;

[assembly: FunctionsStartup(typeof(Startup))]
namespace CopyZillaGenerator.Function
{
    public class Startup : FunctionsStartup
    {
        public override void Configure(IFunctionsHostBuilder builder)
        {
            builder.Services.AddMediatR(typeof(Startup));
            builder.Services.AddSingleton<IOpenAIService, OpenAIService>();
            builder.Services.AddSingleton<IEventService, EventService>();
            builder.Services.AddSingleton<IAuthorizationService, AuthorizationService>();
            builder.Services.AddSingleton<IPromptBuilder, PromptBuilder>();

            //string localhostCorsPolicy = "localhost";

            //builder.Services.AddCors(options =>
            //{
            //    options.AddPolicy(name: localhostCorsPolicy,
            //                      policy =>
            //                      {
            //                          policy.WithOrigins("localhost").SetIsOriginAllowed((host) => true)
            //                 .AllowAnyMethod()
            //                 .AllowAnyHeader();
            //                      });
            //});
        }
    }
}