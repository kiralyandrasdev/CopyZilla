using CopyZillaBackend.Domain.Entities;

namespace CopyZillaBackend.Application.Contracts.Cache
{
    public interface IProductService
    {
        Task LoadProductsToCacheAsync();
        Task<Product> GetProductAsync(string productId);
        Task<List<Product>> GetProductListAsync();
    }
}