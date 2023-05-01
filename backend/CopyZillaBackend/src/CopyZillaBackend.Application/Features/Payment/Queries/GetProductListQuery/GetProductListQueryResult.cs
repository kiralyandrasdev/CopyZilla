using CopyZillaBackend.Domain.Entities;

namespace CopyZillaBackend.Application.Features.Payment.Queries.GetSubscriptionListQuery
{
    public class GetProductListQueryResult : BaseEventResult
    {
        public List<Product> Value { get; set; }
    }
}