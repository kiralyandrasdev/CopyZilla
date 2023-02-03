namespace CopyZillaBackend.Application.Features.Payment.Queries.GetSubscriptionListQuery
{
    public class GetSubscriptionListQueryDto
    {
        public string Name { get; set; }
        public string PriceId { get; set; }
        public string PriceFormatted { get; set; }
        public string CreditFormatted { get; set; }
        public string PlanType { get; set; }
    }
}