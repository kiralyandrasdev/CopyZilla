using System;
using CopyZillaBackend.Application.Events;
using Stripe;

namespace CopyZillaBackend.Application.Features.Payment.Queries.GetProductListQuery
{
	public class GetProductListQueryResult : BaseEventResult
	{
		public List<GetProductListQueryDTO>? Value { get; set; }
	}
}

