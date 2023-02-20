using CopyZillaBackend.Application.Contracts.Persistence;
using FluentValidation;

namespace CopyZillaBackend.Application.Features.Prompt.ProcessEmailPromptEvent
{
    public class ProcessEmailPromptEventValidator : AbstractValidator<ProcessEmailPromptEvent>
    {
        private readonly IUserRepository _repository;

        public ProcessEmailPromptEventValidator(IUserRepository repository)
        {
            _repository = repository;

            RuleFor(e => e)
              .Must(e => e.Options != null && !string.IsNullOrEmpty(e.Options.Objective))
              .WithMessage("Objective must not be null!")
              .WithErrorCode("400");
            RuleFor(e => e)
               .Must(e => e.Options != null && !string.IsNullOrEmpty(e.Options.Email))
               .WithMessage("CurrentEmail must not be null!")
               .WithErrorCode("400");
            RuleFor(e => e)
             .Must(e => e.Options != null && !string.IsNullOrEmpty(e.Options.Tone))
             .WithMessage("Tone must not be null!")
             .WithErrorCode("400");
            RuleFor(e => e)
              .MustAsync(HasEnoughCreditsAsync)
              .WithMessage("The user does not have enough credits.")
              .WithErrorCode("400");
        }

        private async Task<bool> HasEnoughCreditsAsync(ProcessEmailPromptEvent e, CancellationToken _)
        {
            var user = await _repository.GetByFirebaseUidAsync(e.FirebaseUid);

            return user!.CreditCount > 0;
        }
    }
}
