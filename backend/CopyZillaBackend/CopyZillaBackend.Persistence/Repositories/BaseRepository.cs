using CopyZillaBackend.Application.Contracts.Persistence;
using CopyZillaBackend.Domain.Entities;

namespace CopyZillaBackend.Persistence.Repositories
{
    public class BaseRepository<T> : IAsyncRepository<T> where T : BaseEntity
    {
        private readonly CopyZillaBackendDBContext _context;

        public BaseRepository(CopyZillaBackendDBContext context)
        {
            _context = context;
        }

        public async Task<T> AddAsync(T entity)
        {
            await _context.Set<T>().AddAsync(entity);
            await _context.SaveChangesAsync();
            return entity;
        }

        public async Task<T> GetByIdAsync(Guid id)
        {
            return await _context.Set<T>().FindAsync(id);
        }

        public async Task<IReadOnlyList<T>> ListAllAsync()
        {
            throw new NotImplementedException();
        }

        public async Task UpdateAsync(T entity)
        {
            throw new NotImplementedException();
        }

        public async Task DeleteAsync(T entity)
        {
            throw new NotImplementedException();
        }

        public async Task<IReadOnlyList<T>> GetPagedReponseAsync(int page, int size)
        {
            throw new NotImplementedException();
        }
    }
}
