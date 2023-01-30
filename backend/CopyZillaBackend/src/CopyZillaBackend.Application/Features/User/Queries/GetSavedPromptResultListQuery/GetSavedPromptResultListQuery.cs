using System;
using MediatR;

namespace CopyZillaBackend.Application.Features.User.Queries.GetSavedPromptResultListQuery
{
	public class GetSavedPromptResultListQuery : IRequest<GetSavedPromptResultListQueryResult>
	{
		public Guid UserId { get; }

        public GetSavedPromptResultListQuery(Guid userId)
        {
            UserId = userId;
        }
    }
}

