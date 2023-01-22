using System;
using CopyZillaBackend.Application.Contracts.Payment;
using MediatR;

namespace CopyZillaBackend.Application.Features.Payment.Queries.GetProductListQuery
{
	public class GetProductListQueryHandler : IRequestHandler<GetProductListQuery, GetProductListQueryResult>
	{
        private readonly IStripeService _stripeService;

        public GetProductListQueryHandler(IStripeService stripeService)
        {
            _stripeService = stripeService;
        }

        public async Task<GetProductListQueryResult> Handle(GetProductListQuery request, CancellationToken cancellationToken)
        {
            var result = new GetProductListQueryResult();

            result.Value = await _stripeService.GetAvailableProductsAsync(request.ProductType);
            result.Value = result.Value.OrderBy(e => int.Parse(e.Metadata["credit_count"])).ToList();

            return result;
        }
    }
}

