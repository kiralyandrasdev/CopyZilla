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
            // Return user by including service usage history for current day
            var user = await _context.Users
                .FirstOrDefaultAsync(e => e.FirebaseUid == firebaseUid);

            if (user == null)
                return null;

            return user;
        }

        public override async Task<User?> GetByIdAsync(Guid id)
        {
            // Return user by including service usage history for current day
            var user = await _context.Users
                .FirstOrDefaultAsync(e => e.Id == id);

            if (user == null)
                return null;

            return user;
        }

        public async Task<User?> GetByCustomerIdAsync(string customerId)
        {
            return await _context.Users.FirstOrDefaultAsync(e => e.StripeCustomerId == customerId);
        }
    }
}
