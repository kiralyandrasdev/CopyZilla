using CopyZillaBackend.Application.Contracts.Firebase;
using FirebaseAdmin;
using FirebaseAdmin.Auth;

namespace CopyZillaBackend.Infrastructure.Firebase
{
    public class FirebaseService : IFirebaseService
    {
        public async Task<UserRecord> GetFirebaseUserAsync(string id) => await FirebaseAuth.GetAuth(FirebaseApp.GetInstance("default")).GetUserAsync(id);

        public async Task DeleteFirebaseUserAsync(string id) => await FirebaseAuth.GetAuth(FirebaseApp.GetInstance("default")).DeleteUserAsync(id);
    }
}
