using System;
namespace CopyZillaBackend.Domain.Entities
{
	public class PromptResult
	{
		public Guid Id { get; set; }
		public Guid UserId { get; set; }
		public string Title { get; set; }
		public string Content { get; set; }
		public DateTime CreatedOn { get; set; }
	}
}

