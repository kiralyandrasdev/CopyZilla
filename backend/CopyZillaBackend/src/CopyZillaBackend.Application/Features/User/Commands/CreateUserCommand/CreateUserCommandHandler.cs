using System;
using CopyZillaBackend.Application.Contracts.Payment;
using CopyZillaBackend.Application.Contracts.Persistence;
using CopyZillaBackend.Application.Events;
using MediatR;
using System.Linq;

namespace CopyZillaBackend.Application.Features.User.Commands.CreateUserCommand
{
    public class CreateUserCommandHandler : IRequestHandler<CreateUserCommand, CreateUserCommandResult>
    {
        private readonly IUserRepository _repository;
        private readonly IStripeService _stripeService;

        public CreateUserCommandHandler(IUserRepository repository, IStripeService stripeService)
        {
            _repository = repository;
            _stripeService = stripeService;
        }

        public async Task<CreateUserCommandResult> Handle(CreateUserCommand request, CancellationToken cancellationToken)
        {
            var result = new CreateUserCommandResult();

            var validator = new CreateUserCommandValidator(_repository);
            var validationResult = await validator.ValidateAsync(request);

            validationResult.Resolve(result);

            if (!result.Success)
                return result;

            var customer = await _stripeService.CreateCustomerAsync(request.Options.Email);

            /// Get default subscription from Stripe (based on metadata key value)
            /// Attach the subscription to the customer
            var subscriptions = await _stripeService.GetAvailableProductsAsync("subscription");
            var defaultSubscription = subscriptions.FirstOrDefault(e => e.Metadata.ContainsKey("default"));

            if (defaultSubscription == null)
                throw new Exception("Default subscription not found. Please contact support. (Error code: 1001)");

            await _stripeService.CreateSubscriptionAsync(customer.Id, defaultSubscription.DefaultPriceId);

            string subscriptionPlanName = $"subscriptionPlanName{DateTime.Now.ToShortDateString()}";

            /// Get the current billing cycle end date
            DateTime subscriptionValidUntil = DateTime.UtcNow.AddDays(30);

            var user = new Domain.Entities.User()
            {
                FirebaseUId = request.Options.FirebaseUid,
                StripeCustomerId = customer.Id,
                Email = request.Options.Email,
                FirstName = request.Options.FirstName,
                LastName = request.Options.LastName,
                SubscriptionPlanName = subscriptionPlanName,
                SubscriptionValidUntil = subscriptionValidUntil,
            };

            await _repository.AddAsync(user);

            result.Value = await _repository.GetByFirebaseUidAsync(request.Options.FirebaseUid);

            return result;
        }
    }
}

