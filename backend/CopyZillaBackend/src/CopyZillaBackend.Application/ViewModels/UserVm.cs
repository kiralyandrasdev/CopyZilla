namespace CopyZillaBackend.Application.ViewModels
{
    public class UserVm
    {
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? Email { get; set; }
        public DateTime CreatedOn { get; set; }
        public bool AccountEnabled { get; set; }
        public bool AccountDeleted { get; set; }
        public int CreditCount { get; set; }
        public string SubscriptionPlanName { get; set; }
        public DateTime SubscriptionValidUntil { get; set; }
    }
}
