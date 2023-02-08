using CopyZillaBackend.Application.Contracts.Payment;
using CopyZillaBackend.Application.Contracts.Persistence;
using CopyZillaBackend.Application.Events;
using MediatR;

namespace CopyZillaBackend.Application.Features.User.Commands.DeleteUserCommand
{
    public class DeleteUserCommandHandler : IRequestHandler<DeleteUserCommand, DeleteUserCommandResult>
    {
        private readonly IUserRepository _repository;
        private readonly IStripeService _stripeService;

        public DeleteUserCommandHandler(IUserRepository repository, IStripeService stripeService)
        {
            _repository = repository;
            _stripeService = stripeService;
        }

        public async Task<DeleteUserCommandResult> Handle(DeleteUserCommand request, CancellationToken cancellationToken)
        {
            var result = new DeleteUserCommandResult();

            var validator = new DeleteUserCommandValidator(_repository, _stripeService);
            var validationResult = await validator.ValidateAsync(request, cancellationToken);

            validationResult.Resolve(result);

            if (!result.Success)
                return result;

            // get user from db
            var userFromDatabase = await _repository.GetByIdAsync(request.UserId);

            if (userFromDatabase == null)
                throw new Exception("User not found in the database.");

            // delete user from db
            await _repository.DeleteAsync(request.UserId);

            // delete user from stripe
            await _stripeService.DeleteCustomerAsync(userFromDatabase.StripeCustomerId);

            //delete user prompt results from mongodb
            var promptResults = await _repository.GetSavedPromptResultListAsync(request.UserId);
            foreach (var p in promptResults)
            {
                await _repository.DeletePromptResultAsync(request.UserId, p.Id);
            }

            return result;
        }
    }
}
