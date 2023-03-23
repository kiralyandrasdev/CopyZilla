using CopyZillaBackend.Application.Contracts.Cache;
using CopyZillaBackend.Application.Contracts.Persistence;
using CopyZillaBackend.Application.Contracts.ServiceUsage;
using CopyZillaBackend.Application.Events;
using CopyZillaBackend.Domain.Entities;
using MediatR;

namespace CopyZillaBackend.Application.Features.User.Queries.GetUserQuery
{
    public class GetUserQueryHandler : IRequestHandler<GetUserQuery, GetUserQueryResult>
    {
        private readonly IUserRepository _repository;
        private readonly IProductService _productService;
        private readonly IServiceUsageHistoryRepository _serviceUsageHistoryRepository;

        public GetUserQueryHandler(IUserRepository repository, IProductService productCache, IServiceUsageHistoryRepository serviceUsageHistoryRepository)
        {
            _repository = repository;
            _productService = productCache;
            _serviceUsageHistoryRepository = serviceUsageHistoryRepository;
        }

        public async Task<GetUserQueryResult> Handle(GetUserQuery request, CancellationToken cancellationToken)
        {
            var result = new GetUserQueryResult();

            var validator = new GetUserQueryValidator(_repository);
            var validationResult = await validator.ValidateAsync(request);

            validationResult.Resolve(result);

            if (!result.Success)
                return result;

            var user = await _repository.GetByFirebaseUidAsync(request.FirebaseUid);

            if (string.IsNullOrEmpty(user.ProductId))
                throw new InvalidOperationException("The user has no subscriptions assigned");

            var product = await _productService.GetProductAsync(user.ProductId);

            var consumedCredits = await _serviceUsageHistoryRepository.GetUserCreditUsageAsync(user.Id);

            result.Value = new GetUserQueryDto
            {
                Id = user.Id,
                FirebaseUid = user.FirebaseUid,
                Email = user.Email,
                Product = product,
                SubscriptionStatus = user.SubscriptionStatus,
                SubscriptionValidUntil = user.SubscriptionValidUntil,
                ConsumedCredits = consumedCredits
            };

            return result;
        }
    }
}

