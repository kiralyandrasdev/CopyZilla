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
              .WithMessage("UserId must not be empty.")
              .WithErrorCode("400");

            RuleFor(e => e)
               .MustAsync(ExistsInDbAsync)
               .WithMessage("User with specified UserId does not exist in the database.")
               .WithErrorCode("404");

            RuleFor(e => e)
              .MustAsync(ExistsInStripeAsync)
              .WithMessage("User with specified StripeCustomerId does not exist in Stripe.")
              .WithErrorCode("404");
        }

        private async Task<bool> ExistsInDbAsync(DeleteUserCommand e, CancellationToken _)
        {
            return await _repository.ExistsAsync(e.UserId);
        }

        private async Task<bool> ExistsInStripeAsync(DeleteUserCommand e, CancellationToken _)
        {
            // get user from db
            var userFromDatabase = await _repository.GetByIdAsync(e.UserId);

            return await _stripeService.GetCustomerByIdAsync(userFromDatabase!.StripeCustomerId) is not null;
        }
    }
}
