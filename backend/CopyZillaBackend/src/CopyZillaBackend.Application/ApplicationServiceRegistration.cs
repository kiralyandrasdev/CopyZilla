using CopyZillaBackend.Application.Profiles;
using Microsoft.Extensions.DependencyInjection;
using System.Reflection;
using CopyZillaBackend.Application.Mediator;
using FluentValidation;

namespace CopyZillaBackend.Application
{
    public static class ApplicationServiceRegistration
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services)
        {
            services.AddValidatorsFromAssembly(Assembly.GetExecutingAssembly());
            services.AddMediatR(c =>
                c.RegisterServicesFromAssembly(Assembly.GetExecutingAssembly())
                    .AddOpenBehavior(typeof(LoggingBehavior<,>))
            );
            services.AddAutoMapper(cfg => cfg.AddProfile<MappingProfile>());
            return services;
        }
    }
}