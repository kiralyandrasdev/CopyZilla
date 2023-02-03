namespace CopyZillaBackend.Domain.Entities
{
    public class User : BaseEntity
    {
        public string FirebaseUid { get; set; }
        public string StripeCustomerId { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? Email { get; set; }
        public bool AccountEnabled { get; set; }
        public bool AccountDeleted { get; set; }
        public DateTime? SubscriptionValidUntil { get; set; }
        public string? SubscriptionPlanName { get; set; }
        public string? PlanType { get; set; }
        public int CreditCount { get; set; }
    }
}
