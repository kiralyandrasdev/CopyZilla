using CopyZillaBackend.Application.Contracts.Authorization;
using CopyZillaBackend.Application.Contracts.OpenAI;
using CopyZillaBackend.Application.Contracts.Prompt;
using CopyZillaBackend.Infrastructure.Authorization;
using CopyZillaBackend.Infrastructure.OpenAI;
using CopyZillaBackend.Infrastructure.Prompt;
using Microsoft.Extensions.DependencyInjection;

namespace CopyZillaBackend.Infrastructure
{
    public static class InfrastructureServiceRegistration
    {
        public static IServiceCollection AddInfrastructureServices(this IServiceCollection services)
        {
            services.AddSingleton<IAuthorizationService, AuthorizationService>();
            services.AddSingleton<IOpenAIService, OpenAIService>();
            services.AddSingleton<IPromptBuilder, PromptBuilder>();

            return services;
        }
    }
}
