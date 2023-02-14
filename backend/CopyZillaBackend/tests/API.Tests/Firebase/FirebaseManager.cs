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

        public async Task<UserRecord> GetUserAsync(string uid)
        {
            return await FirebaseAuth.GetAuth(FirebaseApp.GetInstance("default")).GetUserAsync(uid);
        }

        public async Task<List<ExportedUserRecord>> ListUsersAsync()
        {
            var result = new List<ExportedUserRecord>();
            var enumerator = FirebaseAuth.GetAuth(FirebaseApp.GetInstance("default")).ListUsersAsync(null).GetAsyncEnumerator();

            while (await enumerator.MoveNextAsync())
            {
                result.Add(enumerator.Current);
            }

            return result;
        }

        public async Task DeleteUserAsync(string uid)
        {
            await FirebaseAuth.GetAuth(FirebaseApp.GetInstance("default")).DeleteUserAsync(uid);
        }
    }
}
