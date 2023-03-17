namespace CopyZillaBackend.Domain.Entities
{
    public class Product
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string PriceId { get; set; }
        public int DailyCreditLimit { get; set; }
        public string PriceFormatted { get; set; }
        public string CreditFormatted { get; set; }
        public string PlanType { get; set; }
        public string Description { get; set; }
        public string PricingInterval { get; set; }
        public List<string> Features { get; set; }
    }
}