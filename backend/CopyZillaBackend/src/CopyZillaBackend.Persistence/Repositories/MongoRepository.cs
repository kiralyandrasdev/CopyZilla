using CopyZillaBackend.Application.Contracts.Persistence;
using CopyZillaBackend.Domain.Contracts;
using MongoDB.Driver;

namespace CopyZillaBackend.Persistence.Repositories
{
    public class MongoRepository<T> : IMongoRepository<T> where T : IMongoEntity
    {
        private string _connectionString;
        private string _databaseName;
        private string _collectionName;

        public MongoRepository(string connectionString, string databaseName, string collectionName)
        {
            _connectionString = connectionString;
            _databaseName = databaseName;
            _collectionName = collectionName;
        }

        public async Task AddEntityAsync(T entity)
        {
            if (string.IsNullOrEmpty(entity.Title))
                entity.Title = DateTime.UtcNow.ToString("s");

            var client = new MongoClient(_connectionString);
            var db = client.GetDatabase(_databaseName);
            var collection = db.GetCollection<T>(_collectionName);
            
            await collection.InsertOneAsync(entity);
        }

        public Task<T> GetEntityAsync(Guid userId, Guid entityId)
        {
            var client = new MongoClient(_connectionString);
            var db = client.GetDatabase(_databaseName);
            var collection = db.GetCollection<T>(_collectionName);

            return collection.Find(e => e.Id == entityId && e.UserId == userId).FirstOrDefaultAsync();
        }

        public async Task<List<T>> GetEntitiesAsync(Guid userId) 
        {
            var client = new MongoClient(_connectionString);
            var db = client.GetDatabase(_databaseName);
            var collection = db.GetCollection<T>(_collectionName);

            var result = await collection.FindAsync(e => e.UserId == userId);

            return (await result.ToListAsync()).OrderByDescending(e => e.CreatedOn).ToList();
        }

        public Task UpdateEntityAsync(T entity)
        {
             if (string.IsNullOrEmpty(entity.Title))
                entity.Title = DateTime.UtcNow.ToString("s");
                
            var client = new MongoClient(_connectionString);
            var db = client.GetDatabase(_databaseName);
            var collection = db.GetCollection<T>(_collectionName);

            return collection.ReplaceOneAsync(e => e.Id == entity.Id && e.UserId == entity.UserId, entity);
        }

        public async Task DeleteEntityAsync(Guid userId, Guid entityId)
        {
            var client = new MongoClient(_connectionString);
            var db = client.GetDatabase(_databaseName);
            var collection = db.GetCollection<T>(_collectionName);

            await collection.FindOneAndDeleteAsync(e => e.Id == entityId && e.UserId == userId);
        }
    }
}