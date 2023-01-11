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
            modelBuilder.Entity<User>().HasKey(u => u.Id);

            // TODO: add test data 
            modelBuilder.Entity<User>().HasData(new User
            {
                // fill properties here
            });
        }
    }
}
