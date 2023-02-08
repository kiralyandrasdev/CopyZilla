using System;
using CopyZillaBackend.Application.Contracts.Persistence;
using FluentValidation;

namespace CopyZillaBackend.Application.Features.User.Queries.GetUserQuery
{
    public class GetUserQueryValidator : AbstractValidator<GetUserQuery>
    {
        private readonly IUserRepository _repository;

        public GetUserQueryValidator(IUserRepository repository)
        {
            _repository = repository;

            RuleFor(e => e)
                .MustAsync(ExistsAsync)
                .WithMessage(e => $"User with FirebaseUid '{e.FirebaseUid}' does not exist.")
                .WithErrorCode("404");
        }

        private async Task<bool> ExistsAsync(GetUserQuery e, CancellationToken token)
        {
            return await _repository.ExistsAsync(e.FirebaseUid);
        }
    }
}

