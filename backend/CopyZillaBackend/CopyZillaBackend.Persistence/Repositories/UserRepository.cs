using CopyZillaBackend.Application.Contracts.Persistence;
using CopyZillaBackend.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace CopyZillaBackend.Persistence.Repositories
{
    public class UserRepository : BaseRepository<User>, IUserRepository
    {
        public UserRepository(CopyZillaBackendDBContext context) : base(context)
        {
        }

        public async Task<bool> ExistsAsync(string firebaseuId)
        {
            return (await _context.Users.FirstOrDefaultAsync(e => e.FirebaseUId == firebaseuId)) != null;
        }

        public async Task<User?> GetByFirebaseUidAsync(string firebaseUid)
        {
            return await _context.Users.FirstOrDefaultAsync(e => e.FirebaseUId == firebaseUid);
        }
    }
}
