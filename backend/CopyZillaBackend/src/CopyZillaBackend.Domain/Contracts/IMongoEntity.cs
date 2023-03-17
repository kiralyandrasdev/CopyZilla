namespace CopyZillaBackend.Domain.Contracts
{
    public interface IMongoEntity
    {
        Guid Id { get; set; }
        Guid UserId { get; set; }
		string Title { get; set; }
	    string Content { get; set; }
        DateTime CreatedOn { get; set; }
    }
}