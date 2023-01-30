namespace CopyZillaBackend.Domain.Entities
{
    public class User : BaseEntity
    {
        public string FirebaseUId { get; set; }
        public string StripeCustomerId { get; set; } //only backend
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? Email { get; set; }
        public bool AccountEnabled { get; set; }
        public bool AccountDeleted { get; set; }
        public DateTime SubscriptionValidUntil { get; set; }
        public string SubscriptionPlanName { get; set; }
        // public bool FreePlan { get; set; }
        public int CreditCount { get; set; } = 20;
    }
}
