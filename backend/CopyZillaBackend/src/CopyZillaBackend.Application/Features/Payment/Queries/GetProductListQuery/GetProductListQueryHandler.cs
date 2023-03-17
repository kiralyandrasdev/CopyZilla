using CopyZillaBackend.Application.Contracts.Cache;
using MediatR;

namespace CopyZillaBackend.Application.Features.Payment.Queries.GetSubscriptionListQuery
{
    public class GetProductListQueryHandler : IRequestHandler<GetProductListQuery, GetProductListQueryResult>
    {
        private readonly IProductService _productService;

        public GetProductListQueryHandler(IProductService productService)
        {
            _productService = productService;
        }

        public async Task<GetProductListQueryResult> Handle(GetProductListQuery request, CancellationToken cancellationToken)
        {
            var result = new GetProductListQueryResult();

            result.Value = await _productService.GetProductListAsync();

            return result;
        }
    }
}