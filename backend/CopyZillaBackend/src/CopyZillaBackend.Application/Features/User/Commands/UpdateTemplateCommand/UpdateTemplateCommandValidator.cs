using CopyZillaBackend.Application.Contracts.Persistence;
using CopyZillaBackend.Application.Error;
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
            .Must(e => !string.IsNullOrEmpty(e.Options.Content))
            .WithMessage(ErrorMessages.TemplateContentMustNotBeEmpty)
            .WithErrorCode("400");

            RuleFor(e => e)
              .MustAsync(TemplateExistsAsync)
              .WithErrorCode("404")
              .WithMessage(ErrorMessages.TemplateNotFound);

            RuleFor(e => e)
               .MustAsync(TitleIsBelowCharacterLimit)
               .WithMessage(ErrorMessages.TemplateTitleTooLong)
               .WithErrorCode("400");

            RuleFor(e => e)
               .Must(e => e.Options.Content.Length < 10000)
               .WithMessage(ErrorMessages.TemplateContentTooLong)
               .WithErrorCode("400");
        }

        private async Task<bool> UserExistsAsync(UpdateTemplateCommand e, CancellationToken _)
        {
            return await _repository.ExistsAsync(e.UserId);
        }

        private async Task<bool> TemplateExistsAsync(UpdateTemplateCommand e, CancellationToken _)
        {
            return await _mongoRepository.GetEntityAsync(e.UserId, e.TemplateId) is not null;
        }

        private async Task<bool> TitleIsBelowCharacterLimit(UpdateTemplateCommand e, CancellationToken _)
        {
            if (!string.IsNullOrEmpty(e.Options.Title))
                return e.Options.Title.Length <= 200;

            return true;
        }
    }
}