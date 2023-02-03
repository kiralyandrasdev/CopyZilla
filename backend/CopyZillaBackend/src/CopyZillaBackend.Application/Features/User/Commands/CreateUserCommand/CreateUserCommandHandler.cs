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
            var validationResult = await validator.ValidateAsync(request, cancellationToken);

            validationResult.Resolve(result);

            if (!result.Success)
                return result;

            var customer = await _stripeService.CreateCustomerAsync(request.Options);

            var products = await _stripeService.GetAvailableProductsAsync("subscription");
            var defaultProduct = products.FirstOrDefault(e => e.Metadata["plan_type"] == "default");

            if (defaultProduct == null)
                throw new Exception("Default product not found. Please contact support. (Error code: 1001)");

            await _stripeService.CreateSubscriptionAsync(customer.Id, defaultProduct.DefaultPriceId);

            var user = new Domain.Entities.User()
            {
                FirebaseUid = request.Options.FirebaseUid,
                StripeCustomerId = customer.Id,
                Email = request.Options.Email,
                FirstName = request.Options.FirstName,
                LastName = request.Options.LastName,
            };

            await _repository.AddAsync(user);

            result.Value = await _repository.GetByFirebaseUidAsync(request.Options.FirebaseUid);

            return result;
        }
    }
}

