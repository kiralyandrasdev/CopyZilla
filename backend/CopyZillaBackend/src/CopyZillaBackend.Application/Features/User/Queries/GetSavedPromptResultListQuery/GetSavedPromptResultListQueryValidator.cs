using System;
using CopyZillaBackend.Application.Contracts.Persistence;
using FluentValidation;

namespace CopyZillaBackend.Application.Features.User.Queries.GetSavedPromptResultListQuery
{
	public class GetSavedPromptResultListQueryValidator : AbstractValidator<GetSavedPromptResultListQuery>
	{
		private readonly IUserRepository _repository;

        public GetSavedPromptResultListQueryValidator(IUserRepository repository)
        {
            _repository = repository;

            RuleFor(e => e)
                .MustAsync(ExistsAsync)
                .WithMessage("The specified user does not exist.");
        }

        private async Task<bool> ExistsAsync(GetSavedPromptResultListQuery e, CancellationToken token)
        {
            return await _repository.ExistsAsync(e.UserId);
        }
    }
}

