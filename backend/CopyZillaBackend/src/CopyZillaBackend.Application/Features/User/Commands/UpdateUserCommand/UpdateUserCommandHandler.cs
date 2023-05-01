using AutoMapper;
using CopyZillaBackend.Application.Contracts.Firebase;
using CopyZillaBackend.Application.Contracts.Payment;
using CopyZillaBackend.Application.Contracts.Persistence;
using MediatR;

namespace CopyZillaBackend.Application.Features.User.Commands.UpdateUserCommand
{
    public class UpdateUserCommandHandler : IRequestHandler<UpdateUserCommand, UpdateUserCommandResult>
    {
        private readonly IUserRepository _repository;
        private readonly IStripeService _stripeService;
        private readonly IFirebaseService _firebaseService;
        private readonly IMapper _mapper;

        public UpdateUserCommandHandler(IUserRepository repository, IStripeService stripeService, IFirebaseService firebaseService, IMapper mapper)
        {
            _repository = repository;
            _stripeService = stripeService;
            _firebaseService = firebaseService; 
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

            var userFromDatabase = await _repository.GetByIdAsync(request.UserId);
            var user = _mapper.Map<Domain.Entities.User>(userFromDatabase);

            user.Email = request.Options.Email;

            await _repository.UpdateAsync(user);

            if (!string.IsNullOrEmpty(request.Options.Email))
            {
                // update user email in stripe
                await _stripeService.UpdateCustomerAsync(userFromDatabase!.StripeCustomerId, request.Options);

                // update user email in firebase
                await _firebaseService.UpdateFirebaseUserAsync(userFromDatabase!.FirebaseUid, request.Options);
            }

            return result;
        }
    }
}