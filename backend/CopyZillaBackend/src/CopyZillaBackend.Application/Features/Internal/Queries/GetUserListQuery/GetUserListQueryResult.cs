namespace CopyZillaBackend.Application.Features.Internal.Queries
{
    public class GetUserListQueryResult : BaseEventResult
    {
        public List<Domain.Entities.User> Value { get; set; }
    }
}