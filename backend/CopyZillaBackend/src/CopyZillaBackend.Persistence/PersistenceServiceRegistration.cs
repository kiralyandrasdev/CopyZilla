using CopyZillaBackend.Application.Contracts.Persistence;
using CopyZillaBackend.Application.Contracts.ServiceUsage;
using CopyZillaBackend.Domain.Entities;
using CopyZillaBackend.Persistence.Cache;
using CopyZillaBackend.Persistence.Repositories;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using StackExchange.Redis;

namespace CopyZillaBackend.Persistence
{
    public static class PersistenceServiceRegistration
    {
        public static IServiceCollection AddPersistenceServices(this IServiceCollection services, IConfiguration configuration)
        {
            Console.WriteLine(configuration.GetConnectionString("SqlConnection"));
            Console.WriteLine(configuration.GetConnectionString("MongoConnection"));

            var mongoConnectionString = configuration.GetConnectionString("MongoConnection");
            var mongoDatabaseName = configuration.GetSection("MongoDB").GetValue<string>("DatabaseName");
            var templateCollectionName = configuration.GetSection("MongoDB").GetValue<string>("TemplateCollectionName");

            services.AddDbContext<CopyZillaBackendDBContext>(options => options.UseNpgsql(configuration.GetConnectionString("SqlConnection")));
            services.AddSingleton<IConnectionMultiplexer>(provider => ConnectionMultiplexer.Connect(configuration.GetConnectionString("RedisConnection")!));
            services.AddSingleton<ICacheService, RedisCacheService>();
            services.AddScoped(typeof(IAsyncRepository<>), typeof(BaseRepository<>));
            services.AddScoped<IServiceUsageHistoryRepository, ServiceUsageHistoryRepository>();
            services.AddScoped<IUserRepository, UserRepository>();
            services.AddScoped<IMongoRepository<EmailTemplate>>(provider => new MongoRepository<EmailTemplate>
            (
                mongoConnectionString,
                mongoDatabaseName,
                templateCollectionName
            ));

            return services;
        }
    }
}
