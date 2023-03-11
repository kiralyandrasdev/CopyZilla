using CopyZillaBackend.Domain.Contracts;

namespace CopyZillaBackend.Application.Contracts.Persistence
{
    public interface IMongoRepository<T> where T : IMongoEntity
    {
        Task AddEntityAsync(T entity);
        Task<T> GetEntityAsync(Guid userId, Guid entityId);
        Task<List<T>> GetEntitiesAsync(Guid userId);
        Task UpdateEntityAsync(T entity);
        Task DeleteEntityAsync(Guid userId, Guid entityId);
    }
}
