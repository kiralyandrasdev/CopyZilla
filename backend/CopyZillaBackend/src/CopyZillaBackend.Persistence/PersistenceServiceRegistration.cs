﻿using CopyZillaBackend.Application.Contracts.Persistence;
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
            Console.WriteLine(configuration.GetConnectionString("SqlConnection"));
            Console.WriteLine(configuration.GetConnectionString("MongoConnection"));
            services.AddDbContext<CopyZillaBackendDBContext>(options => options.UseNpgsql(configuration.GetConnectionString("SqlConnection")));
            services.AddScoped(typeof(IAsyncRepository<>), typeof(BaseRepository<>));
            services.AddScoped<IUserRepository, UserRepository>();
            services.AddScoped<IMongoRepository, MongoRepository>();

            return services;
        }
    }
}
