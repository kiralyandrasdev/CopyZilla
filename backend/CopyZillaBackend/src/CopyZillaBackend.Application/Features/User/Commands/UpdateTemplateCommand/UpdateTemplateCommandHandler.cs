using System;
using CopyZillaBackend.Application.Contracts.Persistence;
using CopyZillaBackend.Application.Events;
using CopyZillaBackend.Domain.Entities;
using MediatR;

namespace CopyZillaBackend.Application.Features.User.Commands.UpdateTemplateCommand
{
    public class UpdateTemplateCommandHandler : IRequestHandler<UpdateTemplateCommand, UpdateTemplateCommandResult>
    {
         private readonly IUserRepository _repository;
         private readonly IMongoRepository<EmailTemplate> _mongoRepository;

        public UpdateTemplateCommandHandler(IUserRepository repository, IMongoRepository<EmailTemplate> mongoRepository)
        {
            _repository = repository;
            _mongoRepository = mongoRepository;
        }

        public async Task<UpdateTemplateCommandResult> Handle(UpdateTemplateCommand request, CancellationToken cancellationToken)
        {
            var result = new UpdateTemplateCommandResult();

            var validator = new UpdateTemplateCommandValidator(_repository, _mongoRepository);
            var validationResult = await validator.ValidateAsync(request, cancellationToken);

            validationResult.Resolve(result);

            if (!result.Success)
                return result;

            var template = await _mongoRepository.GetEntityAsync(request.UserId, request.TemplateId);

            template.Title = request.Options.Title?.Trim();
            template.Content = request.Options.Content.Trim();

            await _mongoRepository.UpdateEntityAsync(template);

            return result;
        }
    }
}