using CopyZillaBackend.Application.Contracts.Firebase;
using FirebaseAdmin.Auth;

namespace CopyZillaBackend.Infrastructure.Firebase
{
    public class FirebaseService : IFirebaseService
    {
        public async Task DeleteFirebaseUserAsync(string id)
        {
            await FirebaseAuth.DefaultInstance.DeleteUserAsync(id);
        }
    }
}
