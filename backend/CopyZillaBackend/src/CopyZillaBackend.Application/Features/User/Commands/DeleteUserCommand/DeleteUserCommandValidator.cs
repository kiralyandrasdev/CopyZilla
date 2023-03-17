using CopyZillaBackend.Application.Contracts.Persistence;
using CopyZillaBackend.Application.Error;
using FluentValidation;

namespace CopyZillaBackend.Application.Features.User.Commands.DeleteUserCommand
{
    public class DeleteUserCommandValidator : AbstractValidator<DeleteUserCommand>
    {
        private readonly IUserRepository _repository;

        public DeleteUserCommandValidator(IUserRepository repository)
        {
            _repository = repository;

            RuleFor(e => e)
              .Must(e => e.UserId != Guid.Empty)
              .WithMessage(ErrorMessages.UserIdMustNotBeNull)
              .WithErrorCode("400");

            RuleFor(e => e)
               .MustAsync(ExistsInDbAsync)
               .WithMessage(ErrorMessages.UserNotFound)
               .WithErrorCode("404");
        }

        private async Task<bool> ExistsInDbAsync(DeleteUserCommand e, CancellationToken _)
        {
            return await _repository.ExistsAsync(e.UserId);
        }
    }
}
