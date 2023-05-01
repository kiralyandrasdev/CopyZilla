using CopyZillaBackend.Application.Contracts.Persistence;
using CopyZillaBackend.Domain.Entities;
using MediatR;

namespace CopyZillaBackend.Application.Features.User.Queries.GetSavedTemplateListQuery
{
    public class GetSavedTemplateListQueryHandler : IRequestHandler<GetSavedTemplateListQuery, GetSavedTemplateListQueryResult>
    {
        private readonly IMongoRepository<EmailTemplate> _mongoRepository;
        private readonly IUserRepository _userRepository;

        public GetSavedTemplateListQueryHandler(IMongoRepository<EmailTemplate> mongoRepository, IUserRepository userRepository)
        {
            _mongoRepository = mongoRepository;
            _userRepository = userRepository;
        }

        public async Task<GetSavedTemplateListQueryResult> Handle(GetSavedTemplateListQuery request, CancellationToken cancellationToken)
        {
            var result = new GetSavedTemplateListQueryResult();

            var validator = new GetSavedTemplateListQueryValidator(_userRepository);
            var validationResult = await validator.ValidateAsync(request, cancellationToken);

            validationResult.Resolve(result);

            if (!result.Success)
                return result;

            result.Value = await _mongoRepository.GetEntitiesAsync(request.UserId);

            return result;
        }
    }
}
