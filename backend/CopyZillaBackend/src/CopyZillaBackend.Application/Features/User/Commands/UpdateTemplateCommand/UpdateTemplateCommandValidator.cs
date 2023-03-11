using CopyZillaBackend.Application.Contracts.Persistence;
using CopyZillaBackend.Domain.Entities;
using FluentValidation;

namespace CopyZillaBackend.Application.Features.User.Commands.UpdateTemplateCommand
{
    public class UpdateTemplateCommandValidator : AbstractValidator<UpdateTemplateCommand>
    {
        private readonly IUserRepository _repository;
        private readonly IMongoRepository<EmailTemplate> _mongoRepository;

        public UpdateTemplateCommandValidator(IUserRepository repository, IMongoRepository<EmailTemplate> mongoRepository)
        {
            _repository = repository;
            _mongoRepository = mongoRepository;

            RuleFor(e => e)
              .MustAsync(UserExistsAsync)
              .WithErrorCode("404")
              .WithMessage("User does not exist.");

            RuleFor(e => e)
              .MustAsync(TemplateExistsAsync)
              .WithErrorCode("404")
              .WithMessage("Template does not exist.");
        }

        private async Task<bool> UserExistsAsync(UpdateTemplateCommand e, CancellationToken _)
        {
            return await _repository.ExistsAsync(e.UserId);
        }

        private async Task<bool> TemplateExistsAsync(UpdateTemplateCommand e, CancellationToken _)
        {
            return await _mongoRepository.GetEntityAsync(e.UserId, e.TemplateId) is not null;
        }
    }
}