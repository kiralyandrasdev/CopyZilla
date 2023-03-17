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

        public async Task<int> GetUserCreditUsageAsync(Guid userId)
        {
            int creditUsage;

            var scopeFactory = _factory.Services.GetService<IServiceScopeFactory>();
            using (var scope = scopeFactory!.CreateScope())
            {
                var context = scope.ServiceProvider.GetService<CopyZillaBackendDBContext>();
                creditUsage = await context!.ServiceUsageHistory
                    .Where(e => e.UserId == userId && e.CreatedOn >= DateTime.Today)
                    .CountAsync();
            }

            return creditUsage;
        }

        public async Task AddUserCreditUsageAsync(Guid userI, int count = 1)
        {
            var scopeFactory = _factory.Services.GetService<IServiceScopeFactory>();
            using (var scope = scopeFactory!.CreateScope())
            {
                var context = scope.ServiceProvider.GetService<CopyZillaBackendDBContext>();

                for (int i = 0; i < count; i++)
                {
                    await context!.ServiceUsageHistory.AddAsync(new ServiceUsageHistory()
                    {
                        UserId = userI,
                        ServiceName = "Test",
                    });
                }

                await context!.SaveChangesAsync();
            }
        }
    }
}

