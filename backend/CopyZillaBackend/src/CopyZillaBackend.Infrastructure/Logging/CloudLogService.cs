using System.Text;
using Azure.Storage.Blobs;
using Azure.Storage.Blobs.Specialized;
using CopyZillaBackend.Application.Contracts.Logging;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;

namespace CopyZillaBackend.Infrastructure.Logging
{
    public class CloudLogService : ICloudLogService
    {
        private readonly IConfiguration _configuration;

        public CloudLogService(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public async Task WriteLogAsync(string content, LogLevel level = LogLevel.Information)
        {
            var connectionString = _configuration.GetConnectionString("AzureLogStorageConnection");

            if (string.IsNullOrEmpty(connectionString))
                return;

            var client = new BlobServiceClient(connectionString);

            var containerName = level.ToString().ToLower();

            var container = client.GetBlobContainerClient(containerName);

            await container.CreateIfNotExistsAsync();

            string fileName = $"{DateTime.UtcNow:yyyy-MM-dd}.txt";

            var blobClient = new AppendBlobClient(connectionString, containerName, fileName);

            await blobClient.CreateIfNotExistsAsync();

            var formattedContent = $"[{DateTime.UtcNow}] {content}{Environment.NewLine}";
            var bytes = Encoding.UTF8.GetBytes(formattedContent);

            var stream = new MemoryStream(bytes);

            await blobClient.AppendBlockAsync(stream);
        }
    }
}