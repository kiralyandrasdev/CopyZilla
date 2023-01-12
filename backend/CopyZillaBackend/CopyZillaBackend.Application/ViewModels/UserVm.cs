namespace CopyZillaBackend.Application.ViewModels
{
    public class UserVm
    {
        public Guid Id { get; set; }

        public string FirebaseUId { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string Email { get; set; }

        public DateTime CreatedOn { get; set; }

        public bool AccountEnabled { get; set; }

        public bool AccountDisabled { get; set; }

        public int CreditCount { get; set; }

        public string SubscriptionPlanName { get; set; }

        public DateTime SubscriptionValidUntil { get; set; }
    }
}
