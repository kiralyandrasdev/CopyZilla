using CopyZillaBackend.Application.Contracts.Persistence;
using CopyZillaBackend.Application.Events;
using CopyZillaBackend.Domain.Entities;
using MediatR;

namespace CopyZillaBackend.Application.Features.User.Commands.SaveTemplateCommand
{
    public class SaveTemplateCommandHandler : IRequestHandler<SaveTemplateCommand, SaveTemplateCommandResult>
    {
        private readonly IUserRepository _userRepository;
        private readonly IMongoRepository<EmailTemplate> _mongoRepository;

        public SaveTemplateCommandHandler(IUserRepository repository, IMongoRepository<EmailTemplate> mongoRepository)
        {
            _userRepository = repository;
            _mongoRepository = mongoRepository;
        }

        public async Task<SaveTemplateCommandResult> Handle(SaveTemplateCommand request, CancellationToken cancellationToken)
        {
            var result = new SaveTemplateCommandResult();

            var validator = new SaveTemplateCommandValidator(_userRepository, _mongoRepository);
            var validationResult = await validator.ValidateAsync(request, cancellationToken);

            validationResult.Resolve(result);

            if (!result.Success)
                return result;

            var emailTemplate = new EmailTemplate()
            {
                Id = Guid.NewGuid(),
                UserId = request.UserId,
                Title = request.Options.Title?.Trim(),
                Content = request.Options.Content.Trim()
            };

            await _mongoRepository.AddEntityAsync(emailTemplate);

            return result;
        }
    }
}
