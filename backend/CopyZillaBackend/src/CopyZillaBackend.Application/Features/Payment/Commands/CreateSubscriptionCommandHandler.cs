using CopyZillaBackend.Application.Contracts.Cache;
using CopyZillaBackend.Application.Contracts.Payment;
using CopyZillaBackend.Application.Contracts.Persistence;
using CopyZillaBackend.Application.Events;
using MediatR;

namespace CopyZillaBackend.Application.Features.Payment.Commands
{
    public class CreateSubscriptionCommandHandler : IRequestHandler<CreateSubscriptionCommand, CreateSubscriptionCommandResult>
    {
        private readonly IUserRepository _repository;
        private readonly IStripeService _stripeService;
        private readonly IProductService _productService;

        public CreateSubscriptionCommandHandler(IUserRepository repository, IStripeService stripeService, IProductService productService)
        {
            _repository = repository;
            _stripeService = stripeService;
            _productService = productService;
        }

        public async Task<CreateSubscriptionCommandResult> Handle(CreateSubscriptionCommand request, CancellationToken cancellationToken)
        {
            var result = new CreateSubscriptionCommandResult();

            var validator = new CreateSubscriptionCommandValidator(_repository);
            var validationResult = await validator.ValidateAsync(request);

            validationResult.Resolve(result);

            if (!result.Success)
                return result;

            var products = await _productService.GetProductListAsync();
            var defaultProduct = products.FirstOrDefault(x => x.PlanType == "default");

            if(defaultProduct == null)
                throw new Exception("Default product not found. Please contact support. (Error code: 0x00000001)");

            var user = await _repository.GetByIdAsync(request.UserId);
            result.Value = await _stripeService.CreateSubscriptionCheckoutSessionAsync(user?.StripeCustomerId!, defaultProduct.PriceId);

            return result;
        }
    }
}

