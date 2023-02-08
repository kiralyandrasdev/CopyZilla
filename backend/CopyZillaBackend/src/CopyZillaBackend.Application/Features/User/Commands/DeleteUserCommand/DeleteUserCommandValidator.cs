using CopyZillaBackend.Application.Contracts.Payment;
using CopyZillaBackend.Application.Contracts.Persistence;
using FluentValidation;

namespace CopyZillaBackend.Application.Features.User.Commands.DeleteUserCommand
{
    public class DeleteUserCommandValidator : AbstractValidator<DeleteUserCommand>
    {
        private readonly IUserRepository _repository;
        private readonly IStripeService _stripeService;

        public DeleteUserCommandValidator(IUserRepository repository, IStripeService stripeService)
        {
            _repository = repository;
            _stripeService= stripeService;

            RuleFor(e => e)
              .Must(e => e.UserId != Guid.Empty)
              .WithMessage("UserId must not be empty.");

            RuleFor(e => e)
               .MustAsync(ExistsInDbAsync)
               .WithMessage("User with specified UserId does not exist in the database.");

            RuleFor(e => e)
              .MustAsync(ExistsInStripeAsync)
              .WithMessage("User with specified StripeCustomerId does not exist in Stripe.");
        }

        private async Task<bool> ExistsInDbAsync(DeleteUserCommand e, CancellationToken _)
        {
            return await _repository.ExistsAsync(e.UserId);
        }

        private async Task<bool> ExistsInStripeAsync(DeleteUserCommand e, CancellationToken _)
        {
            // get user from db
            var userFromDatabase = await _repository.GetByIdAsync(e.UserId);

            if (userFromDatabase == null)
                throw new Exception("User not found in the database.");

            return await _stripeService.GetCustomerByIdAsync(userFromDatabase.StripeCustomerId) is not null;
        }
    }
}
