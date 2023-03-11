using CopyZillaBackend.Domain.Contracts;

namespace CopyZillaBackend.Application.Contracts.Persistence
{
    public interface IMongoRepository<T> where T : IMongoEntity
    {
        Task AddEntityAsync(T entity);
        Task<List<T>> GetEntitiesAsync(Guid userId);
        Task DeleteEntityAsync(Guid userId, Guid entityId);
    }
}
