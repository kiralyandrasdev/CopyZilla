using CopyZillaBackend.Application.Contracts.Firebase;
using CopyZillaBackend.Application.Features.User.Commands.UpdateUserCommand;
using FirebaseAdmin;
using FirebaseAdmin.Auth;

namespace CopyZillaBackend.Infrastructure.Firebase
{
    public class FirebaseService : IFirebaseService
    {
        public async Task<UserRecord> GetFirebaseUserAsync(string id)
        {
            return await FirebaseAuth.GetAuth(FirebaseApp.GetInstance("default")).GetUserAsync(id);
        }

        public async Task<UserRecord> UpdateFirebaseUserAsync(string id, UpdateUserCommandOptions options)
        {
            var args = new UserRecordArgs()
            {
                Uid = id,
                Email = options.Email
            };

            return await FirebaseAuth.GetAuth(FirebaseApp.GetInstance("default")).UpdateUserAsync(args);
        }

        public async Task DeleteFirebaseUserAsync(string id)
        {
            await FirebaseAuth.GetAuth(FirebaseApp.GetInstance("default")).DeleteUserAsync(id);
        }
    }
}
