namespace CopyZillaBackend.Domain.Entities
{
    public class User : BaseEntity
    {
        public Guid Id { get; set; }

        public string FirebaseUId { get; set; }

        public string? StripeCustomerId { get; set; } //only backend

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string Email { get; set; }

        public DateTime CreatedOn { get; set; }

        public bool AccountEnabled { get; set; }

        public bool AccountDisabled { get; set; }

        public DateTime SubscriptionValidUntil { get; set; }

        public string SubscriptionPlanName { get; set; }

        public int CreditCount { get; set; }
    }
}
