using CopyZillaBackend.Application.Contracts.Persistence;
using MediatR;

namespace CopyZillaBackend.Application.Features.Internal.Queries
{
    public class GetUserListQueryHandler : IRequestHandler<GetUserListQuery, GetUserListQueryResult>
    {
        private readonly IUserRepository _userRepository;

        public GetUserListQueryHandler(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        public async Task<GetUserListQueryResult> Handle(GetUserListQuery request, CancellationToken cancellationToken)
        {
            var result = new GetUserListQueryResult();

            var users = await _userRepository.ListAllAsync();
            result.Value = users.ToList();

            return result;
        }
    }
}