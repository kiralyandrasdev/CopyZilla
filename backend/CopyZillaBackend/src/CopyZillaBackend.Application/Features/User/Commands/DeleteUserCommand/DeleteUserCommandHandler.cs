using CopyZillaBackend.Application.Contracts.Payment;
using CopyZillaBackend.Application.Contracts.Persistence;
using CopyZillaBackend.Application.Events;
using MediatR;

namespace CopyZillaBackend.Application.Features.User.Commands.DeleteUserCommand
{
    public class DeleteUserCommandHandler : IRequestHandler<DeleteUserCommand, DeleteUserCommandResult>
    {
        private readonly IUserRepository _userRepository;
        private readonly IMongoRepository _mongoRepository;
        private readonly IStripeService _stripeService;

        public DeleteUserCommandHandler(IUserRepository repository, IMongoRepository mongoRepository, IStripeService stripeService)
        {
            _userRepository = repository;
            _mongoRepository = mongoRepository; 
            _stripeService = stripeService;
        }

        public async Task<DeleteUserCommandResult> Handle(DeleteUserCommand request, CancellationToken cancellationToken)
        {
            var result = new DeleteUserCommandResult();

            var validator = new DeleteUserCommandValidator(_userRepository, _stripeService);
            var validationResult = await validator.ValidateAsync(request, cancellationToken);

            validationResult.Resolve(result);

            if (!result.Success)
                return result;

            // get user from db
            var userFromDatabase = await _userRepository.GetByIdAsync(request.UserId);

            if (userFromDatabase == null)
                throw new Exception("User not found in the database.");

            // delete user from db
            await _userRepository.DeleteAsync(request.UserId);

            // delete user from stripe
            await _stripeService.DeleteCustomerAsync(userFromDatabase.StripeCustomerId);

            //delete user prompt results from mongodb
            var promptResults = await _mongoRepository.GetPromptResultListAsync(request.UserId);
            foreach (var p in promptResults)
            {
                await _mongoRepository.DeletePromptResultAsync(request.UserId, p.Id);
            }

            return result;
        }
    }
}
