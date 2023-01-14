using System;
using CopyZillaBackend.Application.Contracts.Persistence;
using CopyZillaBackend.Application.Events;
using MediatR;

namespace CopyZillaBackend.Application.Features.User.Commands.CreateUserCommand
{
    public class CreateUserCommandHandler : IRequestHandler<CreateUserCommand, CreateUserCommandResult>
    {
        private readonly IUserRepository _repository;

        public CreateUserCommandHandler(IUserRepository repository)
        {
            _repository = repository;
        }

        public async Task<CreateUserCommandResult> Handle(CreateUserCommand request, CancellationToken cancellationToken)
        {
            var result = new CreateUserCommandResult();

            var validator = new CreateUserCommandValidator(_repository);
            var validationResult = await validator.ValidateAsync(request);

            validationResult.Resolve(result);

            if (!result.Success)
                return result;

            /// Create customer in Stripe through Stripe API and return customerId
            string stripeCustomerId = $"stripeCustomerId{DateTime.Now.ToShortDateString()}";

            /// Attach the required subscription to the newly created customer and return the product plan name
            string subscriptionPlanName = $"subscriptionPlanName{DateTime.Now.ToShortDateString()}";

            /// Get the current billing cycle end date
            DateTime subscriptionValidUntil = DateTime.UtcNow.AddDays(30);

            var user = new Domain.Entities.User()
            {
                FirebaseUId = request.Options.FirebaseUid,
                StripeCustomerId = stripeCustomerId,
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

