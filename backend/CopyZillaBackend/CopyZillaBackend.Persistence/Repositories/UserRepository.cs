using CopyZillaBackend.Application.Contracts.Persistence;
using CopyZillaBackend.Domain.Entities;

namespace CopyZillaBackend.Persistence.Repositories
{
    public class UserRepository : BaseRepository<User>, IUserRepository
    {
        private readonly CopyZillaBackendDBContext _dbContext;

        public UserRepository(CopyZillaBackendDBContext dbContext) : base(dbContext)
        {
            _dbContext = dbContext;
        }
    }
}
