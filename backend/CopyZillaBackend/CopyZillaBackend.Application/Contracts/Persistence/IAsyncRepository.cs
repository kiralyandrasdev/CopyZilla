namespace CopyZillaBackend.Application.Contracts.Persistence
{
    public interface IAsyncRepository<T> where T : class
    {
        Task<T> AddAsync(T entity);
        Task<T?> GetByIdAsync(Guid id);
        Task<bool> ExistsAsync(Guid id);
        Task<IReadOnlyList<T>> ListAllAsync();
        Task UpdateAsync(T entity);
        Task DeleteAsync(Guid id);
        Task<IReadOnlyList<T>> GetPagedReponseAsync(int page, int size);
    }
}
