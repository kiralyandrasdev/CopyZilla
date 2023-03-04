using CopyZillaBackend.Application.Contracts.Logging;
using MediatR;

namespace CopyZillaBackend.Application.Features.Internal.Queries.GetLogListQuery
{
    public class GetLogListQueryHandler : IRequestHandler<GetLogListQuery, GetLogListQueryResult>
    {
        private readonly ICloudLogService _cloudLogService;

        public GetLogListQueryHandler(ICloudLogService cloudLogService)
        {
            _cloudLogService = cloudLogService;
        }

        public async Task<GetLogListQueryResult> Handle(GetLogListQuery request, CancellationToken cancellationToken)
        {
            var result = new GetLogListQueryResult();

            var errors = await _cloudLogService.GetLogListAsync(request.Type);
            result.Value = errors.ToList();

            return result;
        }
    }
}