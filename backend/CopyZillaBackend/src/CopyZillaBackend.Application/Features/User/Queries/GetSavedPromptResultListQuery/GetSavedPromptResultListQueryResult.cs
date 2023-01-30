using CopyZillaBackend.Application.Events;
using CopyZillaBackend.Domain.Entities;

namespace CopyZillaBackend.Application.Features.User.Queries.GetSavedPromptResultListQuery
{
    public class GetSavedPromptResultListQueryResult : BaseEventResult
    {
        public List<PromptResult> Value { get; set; }
    }
}