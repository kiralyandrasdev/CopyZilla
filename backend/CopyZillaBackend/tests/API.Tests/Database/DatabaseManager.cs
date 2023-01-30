using CopyZillaBackend.Domain.Entities;
using CopyZillaBackend.Persistence;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace API.Tests.Database
{
    public class DatabaseManager
    {
        private readonly WebApplicationFactory<Program> _factory;

        public DatabaseManager(WebApplicationFactory<Program> factory)
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

        public async Task AddUserAsync(User user)
        {
            var scopeFactory = _factory.Services.GetService<IServiceScopeFactory>();
            using var scope = scopeFactory!.CreateScope();
            var context = scope.ServiceProvider.GetService<CopyZillaBackendDBContext>();

            await context!.Users.AddAsync(user);
            await context.SaveChangesAsync();
        }

        public async Task<User?> FindUserAsync(string firebaseUid)
        {
            User? user;

            var scopeFactory = _factory.Services.GetService<IServiceScopeFactory>();
            using (var scope = scopeFactory!.CreateScope())
            {
                var context = scope.ServiceProvider.GetService<CopyZillaBackendDBContext>();
                user = await context!.Users.FirstOrDefaultAsync(e => e.FirebaseUId == firebaseUid);
            }

            return user;
        }
    }
}

