using CopyZillaBackend.Application.Contracts.Persistence;
using CopyZillaBackend.Application.Error;
using CopyZillaBackend.Domain.Entities;
using FluentValidation;

namespace CopyZillaBackend.Application.Features.User.Commands.SaveTemplateCommand
{
    public class SaveTemplateCommandValidator : AbstractValidator<SaveTemplateCommand>
    {
        private readonly IUserRepository _repository;
        private readonly IMongoRepository<EmailTemplate> _mongoRepository;

        public SaveTemplateCommandValidator(IUserRepository repository, IMongoRepository<EmailTemplate> mongoRepository)
        {
            _repository = repository;
            _mongoRepository = mongoRepository;

            RuleFor(e => e)
                .Must(e => e.UserId != Guid.Empty)
                .WithMessage(ErrorMessages.UserIdMustNotBeNull)
                .WithErrorCode("400");

            RuleFor(e => e)
               .Must(e => !string.IsNullOrEmpty(e.Options.Content))
               .WithMessage(ErrorMessages.TemplateContentMustNotBeEmpty)
               .WithErrorCode("400");

            RuleFor(e => e)
               .MustAsync(TitleIsBelowCharacterLimit)
               .WithMessage(ErrorMessages.TemplateTitleTooLong)
               .WithErrorCode("400");

            RuleFor(e => e)
               .Must(e => e.Options.Content.Length < 10000)
               .WithMessage(ErrorMessages.TemplateContentTooLong)
               .WithErrorCode("400");

            RuleFor(e => e)
                .MustAsync(ExistsAsync)
                .WithMessage(ErrorMessages.UserNotFound)
                .WithErrorCode("404");

            RuleFor(e => e)
                .MustAsync(IsBelowTemplateLimit)
                .WithMessage(ErrorMessages.TemplateLimitReached)
                .WithErrorCode("400");
        }

        private async Task<bool> ExistsAsync(SaveTemplateCommand e, CancellationToken _)
        {
            return await _repository.ExistsAsync(e.UserId);
        }

        private async Task<bool> IsBelowTemplateLimit(SaveTemplateCommand e, CancellationToken _)
        {
            return (await _mongoRepository.GetEntitiesAsync(e.UserId)).Count < 500;
        }

        private async Task<bool> TitleIsBelowCharacterLimit(SaveTemplateCommand e, CancellationToken _)
        {
            if (!string.IsNullOrEmpty(e.Options.Title))
                return e.Options.Title.Length < 200;

            return true;
        }
    }
}