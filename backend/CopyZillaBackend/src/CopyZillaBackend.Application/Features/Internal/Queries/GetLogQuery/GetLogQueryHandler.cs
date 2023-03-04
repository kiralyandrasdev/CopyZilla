using CopyZillaBackend.Application.Contracts.Logging;
using MediatR;

namespace CopyZillaBackend.Application.Features.Internal.Queries.GetLogQuery
{
    public class GetLogQueryHandler : IRequestHandler<GetLogQuery, GetLogQueryResult>
    {
        private readonly ICloudLogService _logService;

        public GetLogQueryHandler(ICloudLogService logService)
        {
            _logService = logService;
        }

        public async Task<GetLogQueryResult> Handle(GetLogQuery request, CancellationToken cancellationToken)
        {
            var result = new GetLogQueryResult();

            var log = await _logService.GetLogAsync(request.Type, request.FileName);
            result.Value = log;

            return result;
        }
    }
}