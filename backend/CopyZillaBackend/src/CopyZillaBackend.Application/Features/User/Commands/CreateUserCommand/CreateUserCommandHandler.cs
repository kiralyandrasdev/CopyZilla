using CopyZillaBackend.Application.Contracts.Payment;
using CopyZillaBackend.Application.Contracts.Persistence;
using CopyZillaBackend.Application.Events;
using MediatR;

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

            var customer = await _stripeService.CreateCustomerAsync(request.Options);

            /// Get default subscription from Stripe (based on metadata key value)
            /// Attach the subscription to the customer
            var products = await _stripeService.GetAvailableProductsAsync("subscription");
            var defaultProduct = products.FirstOrDefault(e => e.Metadata["plan_type"] == "default");

            if (defaultProduct == null)
                throw new Exception("Default product not found. Please contact support. (Error code: 1001)");

            await _stripeService.CreateSubscriptionAsync(customer.Id, defaultProduct.DefaultPriceId);

            var user = new Domain.Entities.User()
            {
                FirebaseUId = request.Options.FirebaseUid,
                StripeCustomerId = customer.Id,
                Email = request.Options.Email,
                FirstName = request.Options.FirstName,
                LastName = request.Options.LastName,
                SubscriptionPlanName = defaultProduct.Name,
                PlanType = defaultProduct.Metadata["plan_type"],
                CreditCount = int.TryParse(defaultProduct.Metadata["credit_count"], out int i) ? i : 20,
            };

            await _repository.AddAsync(user);

            result.Value = await _repository.GetByFirebaseUidAsync(request.Options.FirebaseUid);

            return result;
        }
    }
}

