using CopyZillaBackend.Application.Contracts.Authorization;
using CopyZillaBackend.Application.Contracts.Cache;
using CopyZillaBackend.Application.Contracts.Firebase;
using CopyZillaBackend.Application.Contracts.Logging;
using CopyZillaBackend.Application.Contracts.OpenAI;
using CopyZillaBackend.Application.Contracts.Payment;
using CopyZillaBackend.Application.Contracts.Prompt;
using CopyZillaBackend.Application.Contracts.Scheduler;
using CopyZillaBackend.Application.Contracts.Webhook;
using CopyZillaBackend.Infrastructure.Authorization;
using CopyZillaBackend.Infrastructure.Firebase;
using CopyZillaBackend.Infrastructure.Logging;
using CopyZillaBackend.Infrastructure.OpenAI;
using CopyZillaBackend.Infrastructure.Prompt;
using CopyZillaBackend.Infrastructure.Scheduler;
using CopyZillaBackend.Infrastructure.StripeServices.Payment;
using CopyZillaBackend.Infrastructure.StripeServices.Product;
using CopyZillaBackend.Infrastructure.StripeServices.Webhook;
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
            services.AddSingleton<IStripeService, StripeService>();
            services.AddSingleton<IWebhookEventHandlerProvider, WebhookEventHandlerProvider>();
            services.AddTransient<ICloudLogBuilder, CloudLogBuilder>();
            services.AddSingleton<ICloudLogService, CloudLogService>();
            services.AddSingleton<IFirebaseService, FirebaseService>();
            services.AddSingleton<IProductService, ProductService>();
            services.AddTransient<IScheduledTasks, ScheduledTasks>();

            return services;
        }
    }
}
