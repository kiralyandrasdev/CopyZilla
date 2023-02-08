using System;
using CopyZillaBackend.Application.Contracts.Persistence;
using CopyZillaBackend.Application.Events;
using FluentValidation;
using MediatR;

namespace CopyZillaBackend.Application.Features.User.Queries.GetUserQuery
{
    public class GetUserQueryHandler : IRequestHandler<GetUserQuery, GetUserQueryResult>
    {
        private readonly IUserRepository _repository;

        public GetUserQueryHandler(IUserRepository repository)
        {
            _repository = repository;
        }

        public async Task<GetUserQueryResult> Handle(GetUserQuery request, CancellationToken cancellationToken)
        {
            var result = new GetUserQueryResult();

            var validator = new GetUserQueryValidator(_repository);
            var validationResult = await validator.ValidateAsync(request);

            validationResult.Resolve(result);

            if (!result.Success)
                return result;

            result.Value = await _repository.GetByFirebaseUidAsync(request.FirebaseUid);

            return result;
        }
    }
}

