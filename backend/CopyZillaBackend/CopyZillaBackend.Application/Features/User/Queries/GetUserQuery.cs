using MediatR;

namespace CopyZillaBackend.Application.Features.User.Queries
{
    public class GetUserQuery : IRequest<GetUserQueryResponse>
    {
        public string FirebaseUid { get; }

        public GetUserQuery(string firebaseUid)
        {
            FirebaseUid = firebaseUid;
        }
    }
}
