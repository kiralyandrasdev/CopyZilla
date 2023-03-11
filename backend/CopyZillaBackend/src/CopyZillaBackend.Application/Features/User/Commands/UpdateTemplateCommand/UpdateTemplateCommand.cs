using MediatR;

namespace CopyZillaBackend.Application.Features.User.Commands.UpdateTemplateCommand
{
    public class UpdateTemplateCommand : IRequest<UpdateTemplateCommandResult>
    {
        public Guid UserId { get; set; }
        public Guid TemplateId { get; set; }
        public UpdateTemplateCommandOptions Options { get; set; }

        public UpdateTemplateCommand(Guid userId, Guid templateId, UpdateTemplateCommandOptions options)
        {
            UserId = userId;
            TemplateId = templateId;
            Options = options;
        }
    }
}