using CopyZillaBackend.Application.Contracts.Persistence;
using FluentValidation;

namespace CopyZillaBackend.Application.Features.User.Queries.GetSavedTemplateListQuery
{
    public class GetSavedTemplateListQueryValidator : AbstractValidator<GetSavedTemplateListQuery>
    {
        private readonly IUserRepository _repository;

        public GetSavedTemplateListQueryValidator(IUserRepository repository)
        {
            _repository = repository;

            RuleFor(e => e)
                .Must(e => e.UserId != Guid.Empty)
                .WithMessage("UserId must not be empty.")
                .WithErrorCode("400");

            RuleFor(e => e)
               .MustAsync(ExistsAsync)
               .WithMessage("User with specified UserId does not exist.")
               .WithErrorCode("404");
        }

        private async Task<bool> ExistsAsync(GetSavedTemplateListQuery e, CancellationToken _)
        {
            return await _repository.ExistsAsync(e.UserId);
        }
    }
}
