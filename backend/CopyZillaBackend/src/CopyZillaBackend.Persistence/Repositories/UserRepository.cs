using CopyZillaBackend.Application.Contracts.Persistence;
using CopyZillaBackend.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using MongoDB.Driver;

namespace CopyZillaBackend.Persistence.Repositories
{
    public class UserRepository : BaseRepository<User>, IUserRepository
    {
        private readonly IConfiguration _configuration;

        public UserRepository(CopyZillaBackendDBContext context, IConfiguration configuration) : base(context)
        {
            _configuration = configuration;
        }

        public async Task<bool> ExistsAsync(string firebaseuId)
        {
            return (await _context.Users.FirstOrDefaultAsync(e => e.FirebaseUid == firebaseuId)) != null;
        }

        public async Task<User?> GetByFirebaseUidAsync(string firebaseUid)
        {
            return await _context.Users.FirstOrDefaultAsync(e => e.FirebaseUid == firebaseUid);
        }

        public async Task IncreaseCreditCount(string firebaseUid, int amount)
        {
            var user = await GetByFirebaseUidAsync(firebaseUid);

            if (user == null)
                return;

            user.CreditCount += amount;

            _context.Users.Update(user);
            _context.Entry(user).State = EntityState.Modified;

            await _context.SaveChangesAsync();
        }

        public async Task DecreaseCreditCount(string firebaseUid, int amount)
        {
            var user = await GetByFirebaseUidAsync(firebaseUid);

            if (user == null)
                return;

            user.CreditCount -= amount;

            _context.Users.Update(user);
            _context.Entry(user).State = EntityState.Modified;

            await _context.SaveChangesAsync();
        }

        public async Task<User?> GetByCustomerIdAsync(string customerId)
        {
            return await _context.Users.FirstOrDefaultAsync(e => e.StripeCustomerId == customerId);
        }

        public async Task SavePromptResultAsync(Guid userId, string? title, string content)
        {
            if (string.IsNullOrEmpty(title))
                title = DateTime.UtcNow.ToString("s");

            var promptResult = new PromptResult()
            {
                Id = Guid.NewGuid(),
                UserId = userId,
                Title = title,
                Content = content,
                CreatedOn = DateTime.UtcNow,
            };

            var connectionString = _configuration.GetConnectionString("UserStorage");

            var client = new MongoClient(connectionString);
            var db = client.GetDatabase("user_db");

            var collection = db.GetCollection<PromptResult>("saved_prompt_results");
            await collection.InsertOneAsync(promptResult);
        }

        public async Task<List<PromptResult>> GetSavedPromptResultListAsync(Guid userId)
        {
            var connectionString = _configuration.GetConnectionString("UserStorage");

            var client = new MongoClient(connectionString);
            var db = client.GetDatabase("user_db");

            var collection = db.GetCollection<PromptResult>("saved_prompt_results");
            var result = await collection.FindAsync(e => e.UserId == userId);

            return (await result.ToListAsync()).OrderByDescending(e => e.CreatedOn).ToList();
        }

        public async Task DeletePromptResultAsync(Guid userId, Guid promptResultId)
        {
            var connectionString = _configuration.GetConnectionString("UserStorage");

            var client = new MongoClient(connectionString);
            var db = client.GetDatabase("user_db");

            var collection = db.GetCollection<PromptResult>("saved_prompt_results");
            await collection.FindOneAndDeleteAsync(e => e.Id == promptResultId && e.UserId == userId);
        }
    }
}
