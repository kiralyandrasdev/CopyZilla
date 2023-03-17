using CopyZillaBackend.Domain.Entities;

namespace CopyZillaBackend.Application.Contracts.Cache
{
    public interface IProductService
    {
        Task<Product> GetProductAsync(string productId);
        Task<List<Product>> GetProductListAsync();
    }
}