using CopyZillaBackend.Application.Contracts.Persistence;
using CopyZillaBackend.Application.Error;
using EmailValidation;
using FluentValidation;

namespace CopyZillaBackend.Application.Features.User.Commands.UpdateUserCommand
{
    public class UpdateUserCommandValidator : AbstractValidator<UpdateUserCommand>
    {
        private readonly IUserRepository _repository;

        public UpdateUserCommandValidator(IUserRepository repository)
        {
            _repository = repository;

            RuleFor(e => e)
                .MustAsync(ExistsAsync)
                .WithErrorCode("404")
                .WithMessage(ErrorMessages.UserNotFound);

            RuleFor(e => e)
                .Must(e =>
                {
                    if (!string.IsNullOrEmpty(e.Options.Email))
                        return EmailValidator.Validate(e.Options.Email);

                    return true;
                })
                .WithErrorCode("400")
                .WithMessage(ErrorMessages.EmailAddressIsNotValid);
        }

        private async Task<bool> ExistsAsync(UpdateUserCommand e, CancellationToken _)
        {
            return await _repository.ExistsAsync(e.UserId);
        }
    }
}