using CopyZillaBackend.Application.Events;

namespace CopyZillaBackend.Application.Features.Internal.Queries.GetLogQuery
{
    public class GetLogQueryResult : BaseEventResult
    {
        public GetLogQueryDto? Value { get; set; }
    }
}