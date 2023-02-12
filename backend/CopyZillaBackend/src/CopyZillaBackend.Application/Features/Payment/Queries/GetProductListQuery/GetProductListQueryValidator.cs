using FluentValidation;

namespace CopyZillaBackend.Application.Features.Payment.Queries.GetProductListQuery
{
	public class GetProductListQueryValidator : AbstractValidator<GetProductListQuery>
    {
		public GetProductListQueryValidator()
		{
            RuleFor(e => e)
               .Must(e => !string.IsNullOrEmpty(e.ProductType))
               .WithMessage("ProductType must not be null.")
                .WithErrorCode("400");
        }
	}
}

