using CopyZillaBackend.Domain.Entities;

namespace CopyZillaBackend.Application.Contracts.Persistence
{
    public interface IMongoRepository
    {
        Task AddPromptResultAsync(PromptResult promptResult);
        Task<List<PromptResult>> GetPromptResultListAsync(Guid userId);
        Task DeletePromptResultAsync(Guid userId, Guid promptResultId);
    }
}
