using System;
using CopyZillaBackend.Application.Events;

namespace CopyZillaBackend.Application.Features.User.Queries.GetUserQuery
{
	public class GetUserQueryResult : BaseEventResult
	{
		public Domain.Entities.User? Value { get; set; }
	}
}

