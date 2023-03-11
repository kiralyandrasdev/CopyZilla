using MediatR;

namespace CopyZillaBackend.Application.Features.User.Commands.SaveTemplateCommand
{
    public class SaveTemplateCommand : IRequest<SaveTemplateCommandResult>
    {
        public Guid UserId { get; }
        public SaveTemplateCommandOptions Options { get; }

        public SaveTemplateCommand(Guid userId, SaveTemplateCommandOptions options)
        {
            UserId = userId;
            Options = options;
        }
    }
}
