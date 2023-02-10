using CopyZillaBackend.Application.Contracts.Persistence;
using CopyZillaBackend.Domain.Entities;
using Microsoft.Extensions.Configuration;
using MongoDB.Driver;

namespace CopyZillaBackend.Persistence.Repositories
{
    public class MongoRepository : IMongoRepository
    {
        private readonly IConfiguration _configuration;

        public MongoRepository(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public async Task AddPromptResultAsync(PromptResult promptResult)
        {
            if (string.IsNullOrEmpty(promptResult.Title))
                promptResult.Title = DateTime.UtcNow.ToString("s");

            var connectionString = _configuration.GetConnectionString("MongoConnection");
            var databaseName = _configuration.GetSection("MongoDB").GetValue<string>("DatabaseName");

            var client = new MongoClient(connectionString);
            var db = client.GetDatabase(databaseName);

            var collectionName = _configuration.GetSection("MongoDB").GetValue<string>("CollectionName");
            var collection = db.GetCollection<PromptResult>(collectionName);
            await collection.InsertOneAsync(promptResult);
        }

        public async Task<List<PromptResult>> GetPromptResultListAsync(Guid userId)
        {
            var connectionString = _configuration.GetConnectionString("MongoConnection");
            var databaseName = _configuration.GetSection("MongoDB").GetValue<string>("DatabaseName");

            var client = new MongoClient(connectionString);
            var db = client.GetDatabase(databaseName);

            var collectionName = _configuration.GetSection("MongoDB").GetValue<string>("CollectionName");
            var collection = db.GetCollection<PromptResult>(collectionName);
            var result = await collection.FindAsync(e => e.UserId == userId);

            return (await result.ToListAsync()).OrderByDescending(e => e.CreatedOn).ToList();
        }

        public async Task DeletePromptResultAsync(Guid userId, Guid promptResultId)
        {
            var connectionString = _configuration.GetConnectionString("MongoConnection");
            var databaseName = _configuration.GetSection("MongoDB").GetValue<string>("DatabaseName");

            var client = new MongoClient(connectionString);
            var db = client.GetDatabase(databaseName);

            var collectionName = _configuration.GetSection("MongoDB").GetValue<string>("CollectionName");
            var collection = db.GetCollection<PromptResult>(collectionName);
            await collection.FindOneAndDeleteAsync(e => e.Id == promptResultId && e.UserId == userId);
        }
    }
}
