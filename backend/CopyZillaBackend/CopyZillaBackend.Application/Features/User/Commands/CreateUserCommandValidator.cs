using CopyZillaBackend.Application.Contracts.Persistence;
using FluentValidation;

namespace CopyZillaBackend.Application.Features.User.Commands
{
    // TODO: implement
    public class CreateUserCommandValidator : AbstractValidator<CreateUserCommand>
    {
        private readonly IUserRepository _userRepository;

        public CreateUserCommandValidator(IUserRepository userRepository)
        {
            _userRepository = userRepository;

            //RuleFor(e => e).MustAsync(DoesCustomerExistAsync).WithMessage("The specified customer already exists [GUID].");
            //RuleFor(e => e).MustAsync(DoesCustomerExistByFirebaseUidAsync).WithMessage("The specified customer already exists [FirebaseUid].");
        }

        //private async Task<bool> DoesCustomerExistAsync(CreateCustomerCommand e, CancellationToken token)
        //{
        //    return !await _repository.DoesExistAsync(e.CustomerInfo.CustomerId);
        //}

        //private async Task<bool> DoesCustomerExistByFirebaseUidAsync(CreateCustomerCommand e, CancellationToken token)
        //{
        //    return !await _repository.DoesExistByFirebaseUidAsync(e.FirebaseUid);
        //}
    }
}
