using AutoMapper;
using CopyZillaBackend.Application.Common;
using CopyZillaBackend.Application.Contracts.Persistence;
using CopyZillaBackend.Application.ViewModels;
using MediatR;

namespace CopyZillaBackend.Application.Features.User.Commands
{
    public class CreateUserCommandHandler : IRequestHandler<CreateUserCommand, CreateUserCommandResponse>
    {
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;

        public CreateUserCommandHandler(IUserRepository userRepository, IMapper mapper)
        {
            _userRepository = userRepository;
            _mapper = mapper;
        }

        public async Task<CreateUserCommandResponse> Handle(CreateUserCommand request, CancellationToken cancellationToken)
        {
            var response = new CreateUserCommandResponse();

            var validator = new CreateUserCommandValidator(_userRepository);
            var validationResult = await validator.ValidateAsync(request);

            validationResult.ResolveResponse(response);

            if (!response.Success)
            {
                return response;
            }

            // TODO: call Stripe API & create customer before inserting in db




            var user = new Domain.Entities.User.User()
            {
                Id = request.User.Id,
                FirebaseUId = request.FirebaseUid,
                StripeCustomerId = request.User.StripeCustomerId,
                FirstName = request.User.FirstName,
                LastName = request.User.LastName,
                Email = request.User.Email,
                CreatedOn = request.User.CreatedOn,
                AccountEnabled = request.User.AccountEnabled,
                AccountDisabled = request.User.AccountDisabled,
                CreditCount = request.User.CreditCount,
                SubscriptionPlanName = request.User.SubscriptionPlanName,
                SubscriptionValidUntil = request.User.SubscriptionValidUntil
            };

            var result = await _userRepository.AddAsync(user);

            response.User = _mapper.Map<UserVm>(result);

            return response;
        }
    }
}
