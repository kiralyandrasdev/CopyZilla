using CopyZillaBackend.Application.Features.User.Commands.UpdateUserCommand;
using FirebaseAdmin.Auth;

namespace CopyZillaBackend.Application.Contracts.Firebase
{
    public interface IFirebaseService
    {
        Task<UserRecord> GetFirebaseUserAsync(string id);
        Task<UserRecord> UpdateFirebaseUserAsync(string id, UpdateUserCommandOptions options);
        Task DeleteFirebaseUserAsync(string id);
    }
}
