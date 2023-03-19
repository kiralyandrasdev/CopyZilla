using CopyZillaBackend.Application.Contracts.Firebase;
using CopyZillaBackend.Application.Contracts.Payment;
using CopyZillaBackend.Application.Contracts.Persistence;
using CopyZillaBackend.Application.Events;
using CopyZillaBackend.Domain.Entities;
using MediatR;

namespace CopyZillaBackend.Application.Features.User.Commands.DeleteUserCommand
{
    public class DeleteUserCommandHandler : IRequestHandler<DeleteUserCommand, DeleteUserCommandResult>
    {
        private readonly IUserRepository _userRepository;
        private readonly IMongoRepository<EmailTemplate> _mongoRepository;
        private readonly IStripeService _stripeService;
        private readonly IFirebaseService _firebaseService;

        public DeleteUserCommandHandler(IUserRepository repository, IMongoRepository<EmailTemplate> mongoRepository, IStripeService stripeService, IFirebaseService firebaseService)
        {
            _userRepository = repository;
            _mongoRepository = mongoRepository; 
            _stripeService = stripeService;
            _firebaseService = firebaseService;
        }

        public async Task<DeleteUserCommandResult> Handle(DeleteUserCommand request, CancellationToken cancellationToken)
        {
            var result = new DeleteUserCommandResult();

            var validator = new DeleteUserCommandValidator(_userRepository);
            var validationResult = await validator.ValidateAsync(request, cancellationToken);

            validationResult.Resolve(result);

            if (!result.Success)
                return result;

            // get user from db
            var userFromDatabase = await _userRepository.GetByIdAsync(request.UserId);

            // delete user from db
            await _userRepository.DeleteAsync(request.UserId);

            // delete user from stripe
            var customer = await _stripeService.GetCustomerByIdAsync(userFromDatabase!.StripeCustomerId);
            if (customer == null)
                throw new Exception($"Customer with customerId: {userFromDatabase.StripeCustomerId} does not exist in Stripe");

            await _stripeService.DeleteCustomerAsync(userFromDatabase.StripeCustomerId);

            // delete user from firebase
            var firebaseUser = await _firebaseService.GetFirebaseUserAsync(userFromDatabase!.FirebaseUid);
            if (firebaseUser == null)
                throw new Exception($"Firebase user with id: {userFromDatabase.FirebaseUid} does not exist in Firebase");

            await _firebaseService.DeleteFirebaseUserAsync(userFromDatabase.FirebaseUid);

            // delete users email templates from mongodb
            var emailTemplates = await _mongoRepository.GetEntitiesAsync(request.UserId);
            foreach (var p in emailTemplates)
            {
                await _mongoRepository.DeleteEntityAsync(request.UserId, p.Id);
            }

            return result;
        }
    }
}
