using CopyZillaBackend.Application.Common;
using CopyZillaBackend.Application.Contracts.Persistence;
using CopyZillaBackend.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace CopyZillaBackend.Persistence.Repositories
{
    public class BaseRepository<T> : IAsyncRepository<T> where T : BaseEntity
    {
        protected readonly CopyZillaBackendDBContext _context;

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

        public async Task<T?> GetByIdAsync(Guid id)
        {
            return await _context.Set<T>()
                .FirstOrDefaultAsync(e => e.Id == id);
        }

        public async Task<IReadOnlyList<T>> ListAllAsync()
        {
            return await _context.Set<T>().ToListAsync();
        }

        public virtual async Task UpdateAsync(T entity)
        {
            var result = await _context.Set<T>().FirstOrDefaultAsync(e => e.Id == entity.Id);

            if (result == null)
                return;

            result = result.CopyFrom(entity);

            _context.Set<T>().Update(result);

            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(Guid id)
        {
            var result = await _context.Set<T>().FirstOrDefaultAsync(e => e.Id == id);

            if (result == null)
                return;

            _context.Set<T>().Remove(result);
            await _context.SaveChangesAsync();
        }

        public async Task<IReadOnlyList<T>> GetPagedReponseAsync(int page, int size)
        {
            throw new NotImplementedException();
        }

        public async Task<bool> ExistsAsync(Guid id)
        {
            return (await _context.Set<T>().FirstOrDefaultAsync(e => e.Id == id)) != null;
        }
    }
}
