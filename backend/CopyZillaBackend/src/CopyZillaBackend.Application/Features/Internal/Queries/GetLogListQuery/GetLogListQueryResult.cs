using CopyZillaBackend.Application.Events;

namespace CopyZillaBackend.Application.Features.Internal.Queries.GetLogListQuery
{
    public class GetLogListQueryResult : BaseEventResult
    {
        public List<GetLogListQueryDto> Value { get; set; }
    }
}