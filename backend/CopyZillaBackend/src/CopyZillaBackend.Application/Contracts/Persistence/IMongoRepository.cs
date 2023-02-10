using CopyZillaBackend.Domain.Entities;

namespace CopyZillaBackend.Application.Contracts.Persistence
{
    public interface IMongoRepository : IAsyncRepository<PromptResult>
    {
        Task<List<PromptResult>> GetPromptResultListAsync(Guid userId);
        Task DeletePromptResultAsync(Guid userId, Guid promptResultId);
    }
}
