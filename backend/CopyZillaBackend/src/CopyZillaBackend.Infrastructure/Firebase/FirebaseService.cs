using CopyZillaBackend.Application.Contracts.Firebase;
using FirebaseAdmin;
using FirebaseAdmin.Auth;
using Google.Apis.Auth.OAuth2;

namespace CopyZillaBackend.Infrastructure.Firebase
{
    public class FirebaseService : IFirebaseService
    {
        public FirebaseService()
        {
            FirebaseApp.Create(new AppOptions()
            {
                Credential = GoogleCredential.FromFile("../../config/firebaseConfig.json"),
            });
        }

        public async Task DeleteFirebaseUserAsync(string id)
        {
            await FirebaseAuth.DefaultInstance.DeleteUserAsync(id);
        }
    }
}
