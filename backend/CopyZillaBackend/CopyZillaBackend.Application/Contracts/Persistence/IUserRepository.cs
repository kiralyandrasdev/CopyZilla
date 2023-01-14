using CopyZillaBackend.Domain.Entities;

namespace CopyZillaBackend.Application.Contracts.Persistence
{
    public interface IUserRepository : IAsyncRepository<User>
    {
        Task<User?> GetByFirebaseUidAsync(string firebaseUid);
        Task<bool> ExistsAsync(string firebaseuId);
    }
}
