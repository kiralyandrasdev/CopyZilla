namespace CopyZillaBackend.Domain.Entities
{
    public class BaseEntity
    {
        public Guid Id { get; set; }
        public DateTime? CreatedOn { get; set; }

        protected BaseEntity()
        {
            CreatedOn = DateTime.UtcNow;
        }
    }
}
