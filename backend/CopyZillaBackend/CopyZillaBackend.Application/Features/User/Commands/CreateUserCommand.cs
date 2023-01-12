using MediatR;

namespace CopyZillaBackend.Application.Features.User.Commands
{
    public class CreateUserCommand : IRequest<CreateUserCommandResponse>
    {
        public string FirebaseUid { get; }

        public Domain.Entities.User User { get; }

        public CreateUserCommand(string firebaseUid, Domain.Entities.User user)
        {
            FirebaseUid = firebaseUid;
            User = user;
        }
    }
}
