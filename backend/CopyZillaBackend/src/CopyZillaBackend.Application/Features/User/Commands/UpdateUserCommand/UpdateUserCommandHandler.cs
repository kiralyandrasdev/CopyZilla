using AutoMapper;
using CopyZillaBackend.Application.Contracts.Payment;
using CopyZillaBackend.Application.Contracts.Persistence;
using CopyZillaBackend.Application.Events;
using MediatR;

namespace CopyZillaBackend.Application.Features.User.Commands.UpdateUserCommand
{
    public class UpdateUserCommandHandler : IRequestHandler<UpdateUserCommand, UpdateUserCommandResult>
    {
        private readonly IUserRepository _repository;
        private readonly IStripeService _stripeService;
        private readonly IMapper _mapper;

        public UpdateUserCommandHandler(IUserRepository repository, IStripeService stripeService, IMapper mapper)
        {
            _repository = repository;
            _stripeService = stripeService;
            _mapper = mapper;
        }

        public async Task<UpdateUserCommandResult> Handle(UpdateUserCommand request, CancellationToken cancellationToken)
        {
            var result = new UpdateUserCommandResult();

            var validator = new UpdateUserCommandValidator(_repository);
            var validationResult = await validator.ValidateAsync(request, cancellationToken);

            validationResult.Resolve(result);

            if (!result.Success)
                return result;

            var user = _mapper.Map<Domain.Entities.User>(request.Options);
            user.Id = request.UserId;
            await _repository.UpdateAsync(user);

            if (!string.IsNullOrEmpty(request.Options.Email))
            {
                var userFromDatabase = await _repository.GetByIdAsync(request.UserId);
                await _stripeService.UpdateCustomerAsync(userFromDatabase!.StripeCustomerId, request.Options);
            }

            return result;
        }
    }
}