using API.Tests.Engine;
using CopyZillaBackend.Domain.Entities;
using Microsoft.Extensions.Configuration;
using MongoDB.Driver;

namespace API.Tests.Database
{
    public class MongoDBManager //TODO: try with cloud atlas mongodb connection string
    {
        private readonly WebApplicationFactoryEngine<Program> _factory;

        public MongoDBManager(WebApplicationFactoryEngine<Program> factory)
        {
            _factory = factory;
        }

        public void ClearSchema()
        {
            var connectionString = _factory.Configuration.GetConnectionString("MongoConnection");
            var databaseName = _factory.Configuration.GetSection("MongoDB").GetValue<string>("DatabaseName");
            var collectionName = _factory.Configuration.GetSection("MongoDB").GetValue<string>("CollectionName");

            var client = new MongoClient(connectionString);

            // drop db 
            client.DropDatabase(databaseName);

            // create
            var newDb = client.GetDatabase(databaseName);
            newDb.GetCollection<PromptResult>(collectionName);
        }

        public async Task<PromptResult> AddPromptResultAsync(PromptResult promptResult)
        {
            var connectionString = _factory.Configuration.GetConnectionString("MongoConnection");
            var databaseName = _factory.Configuration.GetSection("MongoDB").GetValue<string>("DatabaseName");
            var collectionName = _factory.Configuration.GetSection("MongoDB").GetValue<string>("CollectionName");

            var client = new MongoClient(connectionString);
            var db = client.GetDatabase(databaseName);

            var collection = db.GetCollection<PromptResult>(collectionName);
            await collection.InsertOneAsync(promptResult);

            return promptResult;
        }

        public async Task<List<PromptResult>> GetPromptResultListAsync(Guid userId)
        {
            var connectionString = _factory.Configuration.GetConnectionString("MongoConnection");
            var databaseName = _factory.Configuration.GetSection("MongoDB").GetValue<string>("DatabaseName");
            var collectionName = _factory.Configuration.GetSection("MongoDB").GetValue<string>("CollectionName");

            var client = new MongoClient(connectionString);
            var db = client.GetDatabase(databaseName);

            var collection = db.GetCollection<PromptResult>(collectionName);
            var result = await collection.FindAsync(e => e.UserId == userId);

            return (await result.ToListAsync()).OrderByDescending(e => e.CreatedOn).ToList();
        }
    }
}
