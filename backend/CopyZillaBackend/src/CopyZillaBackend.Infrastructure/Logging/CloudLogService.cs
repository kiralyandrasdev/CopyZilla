using System.Text;
using Azure.Storage.Blobs;
using Azure.Storage.Blobs.Models;
using Azure.Storage.Blobs.Specialized;
using CopyZillaBackend.Application.Contracts.Logging;
using CopyZillaBackend.Application.Features.Internal.Queries.GetLogListQuery;
using CopyZillaBackend.Application.Features.Internal.Queries.GetLogQuery;
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

        public async Task<GetLogQueryDto?> GetLogAsync(string type, string fileName)
        {
            var connectionString = _configuration.GetConnectionString("AzureLogStorageConnection");

            if (string.IsNullOrEmpty(connectionString))
                return null;
            
            var client = new BlobServiceClient(connectionString);

            var container = client.GetBlobContainerClient(type);

            if (!await container.ExistsAsync())
                return null;

            var blobClient = container.GetBlobClient(fileName);

            if (!await blobClient.ExistsAsync())
                return null;

            var download = await blobClient.DownloadAsync();

            // Read the content of the blob into a string
            var content = await new StreamReader(download.Value.Content).ReadToEndAsync();

            return new GetLogQueryDto
            {
                Type = type,
                FileName = fileName,
                Content = content
            };
        }

        public async Task<List<GetLogListQueryDto>> GetLogListAsync(string type)
        {
            var connectionString = _configuration.GetConnectionString("AzureLogStorageConnection");

            if (string.IsNullOrEmpty(connectionString))
                return new List<GetLogListQueryDto>();

            var client = new BlobServiceClient(connectionString);

            var container = client.GetBlobContainerClient(type);

            if (!await container.ExistsAsync())
                return new List<GetLogListQueryDto>();

            var logs = container.GetBlobsAsync();

            var blobs = new List<BlobItem>();

            await foreach (var blob in logs)
            {
                blobs.Add(blob);
            }

            var result = new List<GetLogListQueryDto>();

            foreach (var blob in blobs)
            {
                result.Add(new GetLogListQueryDto
                {
                    FileName = blob.Name,
                    Type = type,
                    CreatedOn = blob.Properties.CreatedOn.GetValueOrDefault().UtcDateTime
                });
            }

            return result.OrderByDescending(x => x.CreatedOn).ToList();
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

            var formattedContent = $"[{DateTime.UtcNow}]{Environment.NewLine}{content}{Environment.NewLine}{Environment.NewLine}";
            var bytes = Encoding.UTF8.GetBytes(formattedContent);

            using var stream = new MemoryStream(bytes);

            await blobClient.AppendBlockAsync(stream);
        }
    }
}