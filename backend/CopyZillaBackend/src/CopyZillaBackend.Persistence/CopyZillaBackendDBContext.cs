using CopyZillaBackend.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace CopyZillaBackend.Persistence
{
    public class CopyZillaBackendDBContext : DbContext
    {
        public CopyZillaBackendDBContext(DbContextOptions<CopyZillaBackendDBContext> options) : base(options)
        {
            Database.Migrate();
        }

        public DbSet<User> Users { get; set; }
        public DbSet<ServiceUsageHistory> ServiceUsageHistory { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>().HasKey(u => u.Id);

            modelBuilder.Entity<User>()
                .Property(e => e.AccountEnabled)
                .HasDefaultValue(true);

            modelBuilder.Entity<User>()
                .Property(e => e.AccountDeleted)
                .HasDefaultValue(false);

            modelBuilder.Entity<ServiceUsageHistory>()
                .HasKey(s => s.Id);

            modelBuilder.Entity<ServiceUsageHistory>()
                .HasOne(s => s.User)
                .WithMany(u => u.ServiceUsageHistory)
                .HasForeignKey(s => s.UserId);

            /// To add new migration run this command from /src folder:
            /// dotnet-ef migrations add {migration name} --project CopyZillaBackend.Persistence/CopyZillaBackend.Persistence.csproj --startup-project CopyZillaBackend.API/CopyZillaBackend.API.csproj
            ///
            /// To update the database to the latest migration this command from the /src folder:
            /// dotnet-ef database update --project CopyZillaBackend.Persistence/CopyZillaBackend.Persistence.csproj --startup-project CopyZillaBackend.API/CopyZillaBackend.API.csproj
        }
    }
}
