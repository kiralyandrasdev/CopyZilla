using System;
using CopyZillaBackend.Application.Contracts.Persistence;
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
                .WithMessage("FirebaseUID must not be null.")
                .WithErrorCode("400");

            RuleFor(e => e)
                .MustAsync(UniqueFirebaseUid)
                .WithMessage("FirebaseUID is already present in the database.")
                .WithErrorCode("400");
        }

        private async Task<bool> UniqueFirebaseUid(CreateUserCommand e, CancellationToken token)
        {
            return !await _repository.ExistsAsync(e.Options.FirebaseUid);
        }
    }
}

