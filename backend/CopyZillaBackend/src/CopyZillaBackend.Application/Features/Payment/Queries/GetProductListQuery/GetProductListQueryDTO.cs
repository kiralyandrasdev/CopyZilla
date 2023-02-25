namespace CopyZillaBackend.Application.Features.Payment.Queries.GetProductListQuery
{
    public class GetProductListQueryDTO
    {
        public string Name { get; set; }
        public string PriceId { get; set; }
        public string PriceFormatted { get; set; }
        public string CreditFormatted { get; set; }
        public string Description { get; set; }
    }
}
