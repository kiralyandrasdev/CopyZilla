namespace CopyZillaBackend.Domain.Entities
{
    public class User : BaseEntity
    {
        public string FirebaseUid { get; set; }
        public string StripeCustomerId { get; set; }
        public string? Email { get; set; }
        public bool AccountEnabled { get; set; }
        public bool AccountDeleted { get; set; }
        public string? ProductId { get; set; }
        public DateTime? SubscriptionValidUntil { get; set; }
        public string? SubscriptionStatus { get; set; }
        public List<ServiceUsageHistory> ServiceUsageHistory { get; set; }
    }
}