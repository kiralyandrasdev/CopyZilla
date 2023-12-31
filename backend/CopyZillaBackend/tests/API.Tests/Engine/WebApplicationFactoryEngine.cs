﻿using System.Diagnostics;
using CopyZillaBackend.Application.Contracts.Persistence;
using CopyZillaBackend.Domain.Entities;
using CopyZillaBackend.Persistence;
using CopyZillaBackend.Persistence.Repositories;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using MongoDB.Driver;

namespace API.Tests.Engine
{
    public class WebApplicationFactoryEngine<TStartup> : WebApplicationFactory<TStartup> where TStartup : class
    {
        public IConfiguration Configuration { get; private set; }

        protected override void ConfigureWebHost(IWebHostBuilder builder)
        {
            IConfiguration configuration = null;

            var directory = Directory.GetCurrentDirectory();
            var settingsFile = "test_appsettings.json";

            builder.ConfigureAppConfiguration(conf =>
            {
                if (!File.Exists(settingsFile))
                {
                    configuration = conf.Build();
                    return;
                }

                configuration = conf.AddJsonFile(Path.Combine(directory, settingsFile)).Build();
            });

            builder.ConfigureServices(services =>
            {
                var descriptor = services.SingleOrDefault(
                    d => d.ServiceType ==
                        typeof(DbContextOptions<CopyZillaBackendDBContext>));

                var configurationDescriptorList = services.Where(
                    d => d.ServiceType == typeof(IConfiguration)).ToList();

                if (descriptor != null)
                {
                    services.Remove(descriptor);
                }

                var configurationDescriptorListClone = new List<ServiceDescriptor>();
                configurationDescriptorListClone.AddRange(configurationDescriptorList);

                foreach (var configuration in configurationDescriptorListClone)
                {
                    services.Remove(configuration);
                }

                services.AddSingleton(configuration);

                services.AddDbContext<CopyZillaBackendDBContext>(options =>
                {
                    var connectionString = configuration!.GetConnectionString("SqlConnection");
                    options.UseNpgsql(connectionString);
                    options.LogTo(message => Debug.WriteLine(message));
                    options.EnableSensitiveDataLogging();
                });

                var mongoConnectionString = configuration.GetConnectionString("MongoConnection");
                var mongoDatabaseName = configuration.GetSection("MongoDB").GetValue<string>("DatabaseName");
                var emailTemplateCollectionName = configuration.GetSection("MongoDB").GetValue<string>("TemplateCollectionName");

                services.AddScoped<IMongoRepository<EmailTemplate>>(provider => new MongoRepository<EmailTemplate>
                (
                    mongoConnectionString,
                    mongoDatabaseName,
                    emailTemplateCollectionName
                ));

                Configuration = configuration!;

                var sp = services.BuildServiceProvider();

                using var scope = sp.CreateScope();

                var scopedServices = scope.ServiceProvider;
            });
        }
    }
}