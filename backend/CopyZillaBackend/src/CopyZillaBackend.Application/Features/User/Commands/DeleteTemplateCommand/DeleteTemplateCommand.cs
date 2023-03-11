using MediatR;

namespace CopyZillaBackend.Application.Features.User.Commands.DeleteTemplateCommand
{
    public class DeleteTemplateCommand : IRequest<DeleteTemplateCommandResult>
    {
        public Guid UserId {get; set; }     
        public Guid TemplateId {get; set; }

        public DeleteTemplateCommand(Guid userId, Guid templateId)
        {
            UserId = userId;
            TemplateId = templateId;
        }   
    }
}