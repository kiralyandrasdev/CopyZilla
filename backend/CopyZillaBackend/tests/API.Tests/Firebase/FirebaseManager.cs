using FirebaseAdmin.Auth;
using FirebaseAdmin;
using CopyZillaBackend.Domain.Entities;
using Microsoft.AspNetCore.Mvc.Testing;

namespace API.Tests.Firebase
{
    public class FirebaseManager
    {
        private readonly WebApplicationFactory<Program> _factory;

        public FirebaseManager(WebApplicationFactory<Program> factory)
        {
            _factory = factory;
        }

        public async Task<UserRecord> CreateFirebaseUserAsync(User user)
        {
            var args = new UserRecordArgs()
            {
                Email = user.Email,
                EmailVerified = false,
                PhoneNumber = "+11234567890",
                Password = "secretPassword",
                DisplayName = user.Id.ToString(),
                Disabled = false,
            };

            return await FirebaseAuth.GetAuth(FirebaseApp.GetInstance("default")).CreateUserAsync(args);
        }
    }
}
