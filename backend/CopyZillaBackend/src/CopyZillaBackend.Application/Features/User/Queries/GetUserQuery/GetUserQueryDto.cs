using CopyZillaBackend.Domain.Entities;

namespace CopyZillaBackend.Application.Features.User.Queries.GetUserQuery
{
    public class GetUserQueryDto
    {
        public Guid Id { get; set; }
        public string FirebaseUid { get; set; }
        public string? Email { get; set; }
        public Product Product { get; set; }
        public DateTime? SubscriptionValidUntil { get; set; }
        public int ConsumedCredits { get; set; }
    }
}