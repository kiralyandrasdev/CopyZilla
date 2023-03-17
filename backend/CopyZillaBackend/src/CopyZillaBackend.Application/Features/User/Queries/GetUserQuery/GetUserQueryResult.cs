using System;
using CopyZillaBackend.Application.Events;

namespace CopyZillaBackend.Application.Features.User.Queries.GetUserQuery
{
	public class GetUserQueryResult : BaseEventResult
	{
		public GetUserQueryDto Value { get; set; }
	}
}

