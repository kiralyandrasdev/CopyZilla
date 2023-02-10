using CopyZillaBackend.Application.Contracts.Persistence;
using CopyZillaBackend.Application.Events;
using MediatR;

namespace CopyZillaBackend.Application.Features.User.Queries.GetSavedPromptResultListQuery
{
    public class GetSavedPromptResultListQueryHandler : IRequestHandler<GetSavedPromptResultListQuery, GetSavedPromptResultListQueryResult>
	{
        private readonly IMongoRepository _mongoRepository;
        private readonly IUserRepository _userRepository;

        public GetSavedPromptResultListQueryHandler(IMongoRepository mongoRepository, IUserRepository userRepository)
        {
            _mongoRepository = mongoRepository;
            _userRepository = userRepository;
        }

        public async Task<GetSavedPromptResultListQueryResult> Handle(GetSavedPromptResultListQuery request, CancellationToken cancellationToken)
        {
            var result = new GetSavedPromptResultListQueryResult();

            var validator = new GetSavedPromptResultListQueryValidator(_userRepository);
            var validationResult = await validator.ValidateAsync(request, cancellationToken);

            validationResult.Resolve(result);

            if (!result.Success)
                return result;

            result.Value = await _mongoRepository.GetPromptResultListAsync(request.UserId);

            return result;
        }
    }
}

