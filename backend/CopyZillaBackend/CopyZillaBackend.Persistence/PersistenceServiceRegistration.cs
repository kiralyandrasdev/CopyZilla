using CopyZillaBackend.Application.Contracts.Persistence;
using CopyZillaBackend.Persistence.Repositories;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace CopyZillaBackend.Persistence
{
    public static class PersistenceServiceRegistration
    {
        public static IServiceCollection AddPersistenceServices(this IServiceCollection services, IConfiguration configuration)
        {
            // TODO: add sql connection string
            Console.WriteLine(configuration.GetConnectionString("SqlConnection"));
            services.AddDbContext<CopyZillaBackendDBContext>(options => options.UseNpgsql(configuration.GetConnectionString("SqlConnection")));
            services.AddScoped(typeof(IAsyncRepository<>), typeof(BaseRepository<>));
            services.AddScoped<IUserRepository, UserRepository>();

            return services;
        }
    }
}
