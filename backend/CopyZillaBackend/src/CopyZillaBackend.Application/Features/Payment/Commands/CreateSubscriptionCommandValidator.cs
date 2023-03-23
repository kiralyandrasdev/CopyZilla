using CopyZillaBackend.Application.Contracts.Persistence;
using CopyZillaBackend.Application.Error;
using FluentValidation;

namespace CopyZillaBackend.Application.Features.Payment.Commands
{
    public class CreateSubscriptionCommandValidator : AbstractValidator<CreateSubscriptionCommand>
    {
        private readonly IUserRepository _repository;

        public CreateSubscriptionCommandValidator(IUserRepository repository)
        {
            _repository = repository;

            RuleFor(e => e)
                .MustAsync(ExistsAsync)
                .WithMessage(ErrorMessages.UserNotFound)
                .WithErrorCode("404");
        }

        private async Task<bool> ExistsAsync(CreateSubscriptionCommand e, CancellationToken token)
        {
            return await _repository.ExistsAsync(e.UserId);
        }
    }
}

