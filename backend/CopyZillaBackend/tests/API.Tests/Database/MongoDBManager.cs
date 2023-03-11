using API.Tests.Engine;
using CopyZillaBackend.Domain.Entities;
using Microsoft.Extensions.Configuration;
using MongoDB.Driver;

namespace API.Tests.Database
{
    public class MongoDBManager //TODO: try with cloud atlas mongodb connection string
    {
        private readonly string? _connectionString;
        private readonly string? _databaseName;
        private readonly string? _promptResultCollectionName;

        public MongoDBManager(WebApplicationFactoryEngine<Program> factory)
        {
            _connectionString = factory.Configuration.GetConnectionString("MongoConnection");
            _databaseName = factory.Configuration.GetSection("MongoDB").GetValue<string>("DatabaseName");
            _promptResultCollectionName = factory.Configuration.GetSection("MongoDB").GetValue<string>("PromptResultCollectionName");
        }

        public void ClearSchema()
        {
            var client = new MongoClient(_connectionString);

            // drop db 
            client.DropDatabase(_databaseName);

            // create
            var newDb = client.GetDatabase(_databaseName);
            newDb.GetCollection<PromptResult>(_promptResultCollectionName);
        }

        public async Task<PromptResult> AddPromptResultAsync(PromptResult promptResult)
        {
            var client = new MongoClient(_connectionString);
            var db = client.GetDatabase(_databaseName);

            var collection = db.GetCollection<PromptResult>(_promptResultCollectionName);
            await collection.InsertOneAsync(promptResult);

            return promptResult;
        }

        public async Task<List<PromptResult>> GetPromptResultListAsync(Guid userId)
        {
            var client = new MongoClient(_connectionString);
            var db = client.GetDatabase(_databaseName);

            var collection = db.GetCollection<PromptResult>(_promptResultCollectionName);
            var result = await collection.FindAsync(e => e.UserId == userId);

            return (await result.ToListAsync()).OrderByDescending(e => e.CreatedOn).ToList();
        }
    }
}
