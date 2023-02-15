using CopyZillaBackend.Application.Contracts.Persistence;
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
              .WithMessage("UserId must not be empty.")
              .WithErrorCode("400");

            RuleFor(e => e)
               .MustAsync(ExistsInDbAsync)
               .WithMessage($"User does not exist in db.")
               .WithErrorCode("404");
        }

        private async Task<bool> ExistsInDbAsync(DeleteUserCommand e, CancellationToken _)
        {
            return await _repository.ExistsAsync(e.UserId);
        }
    }
}
