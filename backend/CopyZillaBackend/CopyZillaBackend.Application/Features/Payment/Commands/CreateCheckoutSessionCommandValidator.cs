using System;
using CopyZillaBackend.Application.Contracts.Persistence;
using FluentValidation;

namespace CopyZillaBackend.Application.Features.Payment.Commands
{
	public class CreateCheckoutSessionCommandValidator : AbstractValidator<CreateCheckoutSessionCommand>
	{
		private readonly IUserRepository _repository;

        public CreateCheckoutSessionCommandValidator(IUserRepository repository)
        {
            _repository = repository;

            RuleFor(e => e)
                .Must(e => e.Options.FirebaseUid != null)
                .WithMessage("FirebaseUID must not be null.");

            RuleFor(e => e)
              .Must(e => e.Options.PriceId != null)
              .WithMessage("PriceId must not be null.");
        }

        private async Task<bool> ExistsAsync(CreateCheckoutSessionCommand e, CancellationToken token)
        {
            return await _repository.ExistsAsync(e.Options.FirebaseUid);
        }
    }
}

