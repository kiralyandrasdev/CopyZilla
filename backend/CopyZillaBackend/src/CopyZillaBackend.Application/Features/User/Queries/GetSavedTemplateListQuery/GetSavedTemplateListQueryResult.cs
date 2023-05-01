using CopyZillaBackend.Domain.Entities;

namespace CopyZillaBackend.Application.Features.User.Queries.GetSavedTemplateListQuery
{
    public class GetSavedTemplateListQueryResult : BaseEventResult
    {
         public List<EmailTemplate> Value { get; set; }
    }
}
