using System;
using CopyZillaBackend.Application.Contracts.Persistence;
using MediatR;

namespace CopyZillaBackend.Application.Features.User.Queries.GetSavedPromptResultListQuery
{
	public class GetSavedPromptResultListQueryHandler : IRequestHandler<GetSavedPromptResultListQuery, GetSavedPromptResultListQueryResult>
	{
        private readonly IUserRepository _repository;

        public GetSavedPromptResultListQueryHandler(IUserRepository repository)
        {
            _repository = repository;
        }

        public async Task<GetSavedPromptResultListQueryResult> Handle(GetSavedPromptResultListQuery request, CancellationToken cancellationToken)
     {
            var result = new GetSavedPromptResultListQueryResult();

            result.Value = await _repository.GetSavedPromptResultListAsync(request.UserId);

            return result;
        }
    }
}

