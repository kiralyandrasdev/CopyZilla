using CopyZillaBackend.Application.Features.Internal.Queries.GetLogListQuery;
using CopyZillaBackend.Application.Features.Internal.Queries.GetLogQuery;
using Microsoft.Extensions.Logging;

namespace CopyZillaBackend.Application.Contracts.Logging
{
    public interface ICloudLogService
    {
        Task WriteLogAsync(string message, LogLevel level = LogLevel.Information);
        Task<List<GetLogListQueryDto>> GetLogListAsync(string type);
        Task<GetLogQueryDto?> GetLogAsync(string type, string fileName);
    }
}