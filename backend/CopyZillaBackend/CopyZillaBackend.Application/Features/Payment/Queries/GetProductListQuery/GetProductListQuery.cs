using System;
using MediatR;

namespace CopyZillaBackend.Application.Features.Payment.Queries.GetProductListQuery
{
	public class GetProductListQuery : IRequest<GetProductListQueryResult>
	{
		public string ProductType { get; }

        public GetProductListQuery(string productType)
        {
            ProductType = productType;
        }
    }
}

