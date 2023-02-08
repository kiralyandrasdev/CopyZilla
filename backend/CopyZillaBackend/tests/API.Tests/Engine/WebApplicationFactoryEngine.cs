using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using CopyZillaBackend.Persistence;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace API.Tests.Engine
{
    public class WebApplicationFactoryEngine<TStartup> : WebApplicationFactory<TStartup> where TStartup : class
    {
        public DbContext Context { get; set; }
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
                    var connectionString = configuration.GetConnectionString("SqlConnection");
                    options.UseNpgsql(connectionString);
                    options.LogTo(message => Debug.WriteLine(message));
                    options.EnableSensitiveDataLogging();
                });

                var sp = services.BuildServiceProvider();

                using var scope = sp.CreateScope();

                var scopedServices = scope.ServiceProvider;
            });
        }
    }
}