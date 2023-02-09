using API.Tests.Engine;
using CopyZillaBackend.Domain.Entities;
using Microsoft.Extensions.Configuration;
using MongoDB.Driver;

namespace API.Tests.Database
{
    public class MongoDBManager //TODO: try with cloud atlas mongodb connection string
    {
        private readonly MongoClient _client;
        private readonly WebApplicationFactoryEngine<Program> _factory;

        public MongoDBManager(WebApplicationFactoryEngine<Program> factory)
        {
            _factory= factory;

            var connectionString = _factory.Configuration.GetConnectionString("MongoConnection");
            _client = new MongoClient(connectionString);
        }

        public void ClearSchema()
        {
            var databaseName = _factory.Configuration.GetSection("MongoDB").GetValue<string>("DatabaseName");

            // drop db 
            _client.DropDatabase(databaseName);

            // create
            var collectionName = _factory.Configuration.GetSection("MongoDB").GetValue<string>("CollectionName");
            var newDb = _client.GetDatabase(databaseName);
            newDb.GetCollection<PromptResult>(collectionName);
        }

        public async Task<List<PromptResult>> GetListOfPromptResultsAsync(Guid userId)
        {
            var databaseName = _factory.Configuration.GetSection("MongoDB").GetValue<string>("DatabaseName");
            var collectionName = _factory.Configuration.GetSection("MongoDB").GetValue<string>("CollectionName");

            var db = _client.GetDatabase(databaseName);
            var collection = db.GetCollection<PromptResult>(collectionName);
            var result = await collection.FindAsync(e => e.UserId == userId);

            return (await result.ToListAsync()).OrderByDescending(e => e.CreatedOn).ToList();
        }

        public async Task DeletePromptResultAsync(Guid userId, Guid promptResultId)
        {
            var databaseName = _factory.Configuration.GetSection("MongoDB").GetValue<string>("DatabaseName");
            var collectionName = _factory.Configuration.GetSection("MongoDB").GetValue<string>("CollectionName");

            var db = _client.GetDatabase(databaseName);
            var collection = db.GetCollection<PromptResult>(collectionName);

            await collection.FindOneAndDeleteAsync(e => e.Id == promptResultId && e.UserId == userId);
        }
    }
}
