using CopyZillaBackend.Domain.Entities;

namespace CopyZillaBackend.Application.Contracts.Persistence
{
    public interface IUserRepository : IAsyncRepository<User>
    {
        Task<User?> GetByFirebaseUidAsync(string firebaseUid);
        Task<User?> GetByCustomerIdAsync(string customerId);
        Task<bool> ExistsAsync(string firebaseuId);
        Task DecreaseCreditCount(string firebaseUid, int amount);
        Task IncreaseCreditCount(string firebaseUid, int amount);
        Task SavePromptResultAsync(Guid userId, string? title, string content);
        Task<List<PromptResult>> GetSavedPromptResultListAsync(Guid userId);
        Task DeletePromptResultAsync(Guid userId, Guid promptResultId);
    }
}
