using CopyZillaBackend.Domain.Contracts;

namespace CopyZillaBackend.Domain.Entities
{
    public class PromptResult : BaseEntity, IMongoEntity
	{
		public Guid UserId { get; set; }
		public string Title { get; set; }
		public string Content { get; set; }
	}
}

