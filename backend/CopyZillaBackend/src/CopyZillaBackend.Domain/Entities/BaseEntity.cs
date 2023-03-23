namespace CopyZillaBackend.Domain.Entities
{
    public class BaseEntity
    {
        public Guid Id { get; set; }
        public DateTime CreatedOn { get; set; } = DateTime.UtcNow;

        protected BaseEntity()
        {
            CreatedOn = DateTime.UtcNow;
        }
    }
}
