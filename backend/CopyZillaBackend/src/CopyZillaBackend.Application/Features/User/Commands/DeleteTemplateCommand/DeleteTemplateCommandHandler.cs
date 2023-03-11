using CopyZillaBackend.Application.Contracts.Persistence;
using CopyZillaBackend.Application.Events;
using CopyZillaBackend.Domain.Entities;
using MediatR;

namespace CopyZillaBackend.Application.Features.User.Commands.DeleteTemplateCommand
{
    public class DeleteTemplateCommandHandler : IRequestHandler<DeleteTemplateCommand, DeleteTemplateCommandResult>
    {
        private readonly IMongoRepository<EmailTemplate> _mongoRepository;

        public DeleteTemplateCommandHandler(IMongoRepository<EmailTemplate> mongoRepository)
        {
            _mongoRepository = mongoRepository;
        }

        public async Task<DeleteTemplateCommandResult> Handle(DeleteTemplateCommand request, CancellationToken cancellationToken)
        {
            var result = new DeleteTemplateCommandResult();

            var validator = new DeleteTemplateCommandValidator();
            var validationResult = await validator.ValidateAsync(request, cancellationToken);

            validationResult.Resolve(result);

            await _mongoRepository.DeleteEntityAsync(request.UserId, request.TemplateId);

            return result;
        }
    }
}