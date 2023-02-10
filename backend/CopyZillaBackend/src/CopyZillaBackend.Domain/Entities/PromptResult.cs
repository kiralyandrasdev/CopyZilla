namespace CopyZillaBackend.Domain.Entities
{
	public class PromptResult : BaseEntity
	{
		public Guid UserId { get; set; }
		public string Title { get; set; }
		public string Content { get; set; }
	}
}

