using CopyZillaBackend.Application.Events;

namespace CopyZillaBackend.Application.Features.Payment.Queries.GetSubscriptionListQuery
{
    public class GetSubscriptionListQueryResult : BaseEventResult
    {
        public List<GetSubscriptionListQueryDto> Value { get; set; }
    }
}