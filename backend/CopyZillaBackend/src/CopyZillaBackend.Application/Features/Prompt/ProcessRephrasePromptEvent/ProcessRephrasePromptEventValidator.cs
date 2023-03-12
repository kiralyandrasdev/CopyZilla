using CopyZillaBackend.Application.Contracts.Persistence;
using FluentValidation;

namespace CopyZillaBackend.Application.Features.Prompt.ProcessRephrasePromptEvent
{
    public class ProcessRephrasePromptEventValidator : AbstractValidator<ProcessRephrasePromptEvent>
    {
        private readonly IUserRepository _repository;

        public ProcessRephrasePromptEventValidator(IUserRepository repository)
        {
            _repository = repository;

            RuleFor(e => e)
              .MustAsync(UserExistsAsync)
              .WithErrorCode("404")
              .WithMessage("User does not exist.");

            RuleFor(e => e)
             .Must(e => !string.IsNullOrEmpty(e.Options.Objective))
             .WithMessage("Objective must not be null!")
             .WithErrorCode("400");

            RuleFor(e => e)
             .Must(e => !string.IsNullOrEmpty(e.Options.Text))
             .WithMessage("Text must not be null!")
             .WithErrorCode("400");
        }

        private async Task<bool> UserExistsAsync(ProcessRephrasePromptEvent e, CancellationToken _)
        {
            return await _repository.ExistsAsync(e.UserId);
        }
    }
}