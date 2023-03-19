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
        private readonly string? _emailTemplateCollectionName;

        public MongoDBManager(WebApplicationFactoryEngine<Program> factory)
        {
            _connectionString = factory.Configuration.GetConnectionString("MongoConnection");
            _databaseName = factory.Configuration.GetSection("MongoDB").GetValue<string>("DatabaseName");
            _emailTemplateCollectionName = factory.Configuration.GetSection("MongoDB").GetValue<string>("TemplateCollectionName");
        }

        public void ClearSchema()
        {
            var client = new MongoClient(_connectionString);

            // drop db 
            client.DropDatabase(_databaseName);

            // create
            var newDb = client.GetDatabase(_databaseName);
            newDb.GetCollection<EmailTemplate>(_emailTemplateCollectionName);
        }

        public async Task<EmailTemplate> AddEmailTemplateAsync(EmailTemplate emailTemplate)
        {
            var client = new MongoClient(_connectionString);
            var db = client.GetDatabase(_databaseName);

            var collection = db.GetCollection<EmailTemplate>(_emailTemplateCollectionName);
            await collection.InsertOneAsync(emailTemplate);

            return emailTemplate;
        }

        public async Task<List<EmailTemplate>> GetEmailTemplateListAsync(Guid userId)
        {
            var client = new MongoClient(_connectionString);
            var db = client.GetDatabase(_databaseName);

            var collection = db.GetCollection<EmailTemplate>(_emailTemplateCollectionName);
            var result = await collection.FindAsync(e => e.UserId == userId);

            return (await result.ToListAsync()).OrderByDescending(e => e.CreatedOn).ToList();
        }
    }
}
