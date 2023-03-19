using CopyZillaBackend.Application.Contracts.Cache;
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
        private readonly IProductService _productService;

        public CreateUserCommandHandler(IUserRepository repository, IStripeService stripeService, IProductService productService)
        {
            _repository = repository;
            _stripeService = stripeService;
            _productService = productService;
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

            var products = await _productService.GetProductListAsync();
            var defaultProduct = products.FirstOrDefault(e => e.PlanType == "default");

            if (defaultProduct == null)
                throw new Exception("Default product not found. Please contact support. (Error code: 1001)");

            await _stripeService.CreateSubscriptionAsync(customer.Id, defaultProduct.PriceId);

            var user = new Domain.Entities.User()
            {
                FirebaseUid = request.Options.FirebaseUid,
                StripeCustomerId = customer.Id,
                Email = request.Options.Email,
            };

            await _repository.AddAsync(user);

            result.Value = await _repository.GetByFirebaseUidAsync(request.Options.FirebaseUid);

            return result;
        }
    }
}

