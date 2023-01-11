namespace CopyZillaBackend.Domain.Entities
{
    public class BaseEntity
    {
        public DateTime? CreatedOn { get; set; }

        protected BaseEntity()
        {
            CreatedOn = DateTime.UtcNow;
        }
    }
}
