using CopyZillaBackend.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace CopyZillaBackend.Persistence
{
    public class CopyZillaBackendDBContext : DbContext
    {
        public CopyZillaBackendDBContext(DbContextOptions<CopyZillaBackendDBContext> options) : base(options)
        {
            Database.EnsureCreated();
        }

        public DbSet<User> Users { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            //modelBuilder.Entity<User>().HasKey(u => u.Id);

            // Test user data 
            modelBuilder.Entity<User>().HasData(new User()
            {
                Id = Guid.NewGuid(),
                FirebaseUId = "000",
                StripeCustomerId = "000",
                FirstName = "Test",
                LastName = "User",
                Email = "testemail@test.com",
                AccountEnabled = true,
                AccountDisabled = false,
                CreditCount = 20,
                SubscriptionPlanName = "Basic",
                SubscriptionValidUntil = DateTime.MaxValue
            });
            modelBuilder.Entity<User>().HasData(new User()
            {
                Id = Guid.NewGuid(),
                FirebaseUId = "111",
                StripeCustomerId = "111",
                FirstName = "Test",
                LastName = "User",
                Email = "testemail@test.com",
                AccountEnabled = false,
                AccountDisabled = true,
                CreditCount = 100,
                SubscriptionPlanName = "Pro",
                SubscriptionValidUntil = DateTime.MaxValue
            });
            modelBuilder.Entity<User>().HasData(new User()
            {
                Id = Guid.NewGuid(),
                FirebaseUId = "222",
                StripeCustomerId = "222",
                FirstName = "Test",
                LastName = "User",
                Email = "testemail@test.com",
                AccountEnabled = true,
                AccountDisabled = false,
                CreditCount = 1000,
                SubscriptionPlanName = "Ultra-Pro",
                SubscriptionValidUntil = DateTime.MaxValue
            });
        }
    }
}
