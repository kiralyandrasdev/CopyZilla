using MediatR;

namespace CopyZillaBackend.Application.Features.User.Commands.UpdateUserCommand
{
    public class UpdateUserCommand : IRequest<UpdateUserCommandResult>
    {
        public UpdateUserCommand(Guid userId, UpdateUserCommandOptions options)
        {
            UserId = userId;
            Options = options;
        }

        public Guid UserId { get; }
        public UpdateUserCommandOptions Options { get; }
    }
}