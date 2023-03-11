using MediatR;

namespace CopyZillaBackend.Application.Features.User.Queries.GetSavedTemplateListQuery
{
    public class GetSavedTemplateListQuery : IRequest<GetSavedTemplateListQueryResult>
    {
        public Guid UserId { get; set; }

        public GetSavedTemplateListQuery(Guid userId)
        {
            UserId = userId; 
        } 
    }
}