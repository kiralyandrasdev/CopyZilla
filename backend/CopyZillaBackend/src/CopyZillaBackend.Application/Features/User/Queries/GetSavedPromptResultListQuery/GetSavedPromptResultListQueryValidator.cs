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
                .Must(e => e.UserId != Guid.Empty)
                .WithMessage("UserId must not be empty.")
                .WithErrorCode("400");

            RuleFor(e => e)
                .MustAsync(ExistsAsync)
                .WithMessage("The specified user does not exist.")
                .WithErrorCode("404");
        }

        private async Task<bool> ExistsAsync(GetSavedPromptResultListQuery e, CancellationToken token)
        {
            return await _repository.ExistsAsync(e.UserId);
        }
    }
}