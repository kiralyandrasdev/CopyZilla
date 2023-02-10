using CopyZillaBackend.Application.Contracts.Persistence;
using CopyZillaBackend.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using MongoDB.Driver;

namespace CopyZillaBackend.Persistence.Repositories
{
    public class UserRepository : BaseRepository<User>, IUserRepository
    {
        private readonly IConfiguration _configuration;

        public UserRepository(CopyZillaBackendDBContext context, IConfiguration configuration) : base(context)
        {
            _configuration = configuration;
        }

        public async Task<bool> ExistsAsync(string firebaseuId)
        {
            return (await _context.Users.FirstOrDefaultAsync(e => e.FirebaseUid == firebaseuId)) != null;
        }

        public async Task<User?> GetByFirebaseUidAsync(string firebaseUid)
        {
            return await _context.Users.FirstOrDefaultAsync(e => e.FirebaseUid == firebaseUid);
        }

        public async Task IncreaseCreditCount(string firebaseUid, int amount)
        {
            var user = await GetByFirebaseUidAsync(firebaseUid);

            if (user == null)
                return;

            user.CreditCount += amount;

            _context.Users.Update(user);
            _context.Entry(user).State = EntityState.Modified;

            await _context.SaveChangesAsync();
        }

        public async Task DecreaseCreditCount(string firebaseUid, int amount)
        {
            var user = await GetByFirebaseUidAsync(firebaseUid);

            if (user == null)
                return;

            user.CreditCount -= amount;

            _context.Users.Update(user);
            _context.Entry(user).State = EntityState.Modified;

            await _context.SaveChangesAsync();
        }

        public async Task<User?> GetByCustomerIdAsync(string customerId)
        {
            return await _context.Users.FirstOrDefaultAsync(e => e.StripeCustomerId == customerId);
        }
    }
}
