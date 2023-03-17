namespace CopyZillaBackend.Domain.Entities
{
    public class ServiceUsageHistory : BaseEntity
    {
        public Guid UserId { get; set; }
        public User User { get; set; }
        public string ServiceName { get; set; }
    }
}