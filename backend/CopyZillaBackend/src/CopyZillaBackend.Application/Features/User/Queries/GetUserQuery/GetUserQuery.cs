using System;
using MediatR;

namespace CopyZillaBackend.Application.Features.User.Queries.GetUserQuery
{
	public class GetUserQuery : IRequest<GetUserQueryResult>
	{
		public string FirebaseUid { get; }

        public GetUserQuery(string firebaseUid)
        {
            FirebaseUid = firebaseUid;
        }
    }
}

