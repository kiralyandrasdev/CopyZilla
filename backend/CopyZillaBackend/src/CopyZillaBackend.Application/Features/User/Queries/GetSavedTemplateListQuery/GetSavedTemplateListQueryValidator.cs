using CopyZillaBackend.Application.Contracts.Persistence;
using CopyZillaBackend.Application.Error;
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
                .WithMessage(ErrorMessages.UserIdMustNotBeNull)
                .WithErrorCode("400");

            RuleFor(e => e)
               .MustAsync(ExistsAsync)
               .WithMessage(ErrorMessages.UserNotFound)
               .WithErrorCode("404");
        }

        private async Task<bool> ExistsAsync(GetSavedTemplateListQuery e, CancellationToken _)
        {
            return await _repository.ExistsAsync(e.UserId);
        }
    }
}
