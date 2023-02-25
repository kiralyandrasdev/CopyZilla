using System;
using CopyZillaBackend.Application.Contracts.Payment;
using CopyZillaBackend.Application.Events;
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

            var validator = new GetProductListQueryValidator();
            var validationResult = await validator.ValidateAsync(request, cancellationToken);
            validationResult.Resolve(result);

            if (!result.Success)
                return result;

            var products = await _stripeService.GetAvailableProductsAsync(request.ProductType);
            products = products.OrderBy(e => int.Parse(e.Metadata["credit_count"])).ToList();

            result.Value = products.Select(e =>
            {
                return new GetProductListQueryDTO()
                {
                    Name = e.Name,
                    PriceId = e.DefaultPriceId,
                    PriceFormatted = e.Metadata["price_formatted"],
                    CreditFormatted = e.Metadata["credit_count_formatted"],
                    Description = e.Description
                };
            })
            .ToList();

            return result;
        }
    }
}

