using CopyZillaBackend.Domain.Entities;
using CopyZillaBackend.Persistence;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace API.Tests.Database
{
    public class PostgresDBManager
    {
        private readonly WebApplicationFactory<Program> _factory;

        public PostgresDBManager(WebApplicationFactory<Program> factory)
        {
            _factory = factory;
        }

        public void ClearSchema()
        {
            var scopeFactory = _factory.Services.GetService<IServiceScopeFactory>();
            using var scope = scopeFactory!.CreateScope();
            var context = scope.ServiceProvider.GetService<CopyZillaBackendDBContext>();

            context!.Database.EnsureDeleted();
            context.Database.Migrate();
        }

        public async Task<User?> AddUserAsync(User user)
        {
            var scopeFactory = _factory.Services.GetService<IServiceScopeFactory>();
            using var scope = scopeFactory!.CreateScope();
            var context = scope.ServiceProvider.GetService<CopyZillaBackendDBContext>();

            var result = await context!.Users.AddAsync(user);
            await context.SaveChangesAsync();

            return result.Entity;
        }

        public async Task<User?> FindUserAsync(string firebaseUid)
        {
            User? user;

            var scopeFactory = _factory.Services.GetService<IServiceScopeFactory>();
            using (var scope = scopeFactory!.CreateScope())
            {
                var context = scope.ServiceProvider.GetService<CopyZillaBackendDBContext>();
                user = await context!.Users.FirstOrDefaultAsync(e => e.FirebaseUid == firebaseUid);
            }

            return user;
        }

        public void RemoveUser(User user)
        {
            var scopeFactory = _factory.Services.GetService<IServiceScopeFactory>();
            using (var scope = scopeFactory!.CreateScope())
            {
                var context = scope.ServiceProvider.GetService<CopyZillaBackendDBContext>();
                context!.Users.Remove(user);
            }
        }
    }
}

