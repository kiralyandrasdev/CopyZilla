using FirebaseAdmin.Auth;

namespace CopyZillaBackend.Application.Contracts.Firebase
{
    public interface IFirebaseService
    {
        Task<UserRecord> GetFirebaseUserAsync(string id);
        Task DeleteFirebaseUserAsync(string id);
    }
}
