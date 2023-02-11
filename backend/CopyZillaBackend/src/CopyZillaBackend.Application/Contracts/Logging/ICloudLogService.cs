using Microsoft.Extensions.Logging;

namespace CopyZillaBackend.Application.Contracts.Logging
{
    public interface ICloudLogService
    {
        Task WriteLogAsync(string message, LogLevel level = LogLevel.Information);
    }
}