using CopyZillaBackend.Application.Contracts.Persistence;
using CopyZillaBackend.Application.Error;
using EmailValidation;
using FluentValidation;

namespace CopyZillaBackend.Application.Features.User.Commands.CreateUserCommand
{
    public class CreateUserCommandValidator : AbstractValidator<CreateUserCommand>
    {
        private readonly IUserRepository _repository;

        public CreateUserCommandValidator(IUserRepository repository)
        {
            _repository = repository;

            RuleFor(e => e)
                .Must(e => e.Options.FirebaseUid != null)
                .WithMessage(ErrorMessages.FirebaseUidMustNotBeNull)
                .WithErrorCode("400");

            RuleFor(e => e)
                .MustAsync(UniqueFirebaseUid)
                .WithMessage(ErrorMessages.FirebaseUidAlreadyExists)
                .WithErrorCode("400");

            RuleFor(e => e)
                .Must(e => e.Options.Email != null)
                .WithMessage(ErrorMessages.EmailMustNotBeNull)
                .WithErrorCode("400");

            RuleFor(e => e)
                .Must(e => EmailValidator.Validate(e.Options.Email))
                .WithMessage(ErrorMessages.EmailAddressIsNotValid)
                .WithErrorCode("400");
        }

        private async Task<bool> UniqueFirebaseUid(CreateUserCommand e, CancellationToken token)
        {
            return !await _repository.ExistsAsync(e.Options.FirebaseUid);
        }
    }
}

