namespace CopyZillaBackend.Application.Contracts.Persistence
{
    public interface ICacheService
    {
        Task SetAsync<T>(string key, T value);
        Task<T?> GetAsync<T>(string key);
        Task<List<T>> GetAllValuesOfTypeAsync<T>();
        Task RemoveAsync(string key);
    }
}
