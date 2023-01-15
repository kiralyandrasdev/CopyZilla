using System;
using CopyZillaBackend.Application.Contracts.Payment;
using CopyZillaBackend.Application.Contracts.Persistence;
using CopyZillaBackend.Application.Events;
using MediatR;

namespace CopyZillaBackend.Application.Features.Payment.Commands
{
	public class CreateCheckoutSessionCommandHandler : IRequestHandler<CreateCheckoutSessionCommand, CreateCheckoutSessionCommandResult>
	{
        private readonly IUserRepository _repository;
        private readonly IStripeService _stripeService;

        public CreateCheckoutSessionCommandHandler(IUserRepository repository, IStripeService stripeService)
        {
            _repository = repository;
            _stripeService = stripeService;
        }

        public async Task<CreateCheckoutSessionCommandResult> Handle(CreateCheckoutSessionCommand request, CancellationToken cancellationToken)
        {
            var result = new CreateCheckoutSessionCommandResult();

            var validator = new CreateCheckoutSessionCommandValidator(_repository);
            var validationResult = await validator.ValidateAsync(request);

            validationResult.Resolve(result);

            if (!result.Success)
                return result;

            result.Value = await _stripeService.CreateCheckoutSessionAsync(request.Options.FirebaseUid, request.Options.PriceId, request.Options.Mode);

            return result;
        }
    }
}

