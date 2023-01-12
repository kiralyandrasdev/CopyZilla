using MediatR;

namespace CopyZillaBackend.Application.Features.User.Queries
{
    public class GetUserQueryHandler : IRequestHandler<GetUserQuery, GetUserQueryResponse>
    {
        public async Task<GetUserQueryResponse> Handle(GetUserQuery request, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }
    }
}
