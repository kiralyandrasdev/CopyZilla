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
             .MustAsync(HasEnoughCreditsAsync)
             .WithMessage("Unfortunately, you have run out of credits." +
             " If you would like to continue using this feature," +
             " please purchase credits through your CopyZilla account.")
             .WithErrorCode("400");
            RuleFor(e => e)
             .Must(InstructionsIsNotNullIfEmailIsEmpty)
             .WithMessage("Instructions must not be null if previous email is not provided.")
             .WithErrorCode("400");
            RuleFor(e => e)
              .Must(ObjectiveIsNullIfEmailIsEmpty)
              .WithMessage("Objective must be null if previous email is not provided.")
              .WithErrorCode("400");
            RuleFor(e => e)
             .Must(e => e.Options != null && !string.IsNullOrEmpty(e.Options.Tone))
             .WithMessage("Tone must not be null!")
             .WithErrorCode("400");
        }

        private async Task<bool> HasEnoughCreditsAsync(ProcessEmailPromptEvent e, CancellationToken _)
        {
            var user = await _repository.GetByFirebaseUidAsync(e.FirebaseUid);

            return user!.CreditCount > 0;
        }

        private bool InstructionsIsNotNullIfEmailIsEmpty(ProcessEmailPromptEvent e)
        {
            if (string.IsNullOrEmpty(e.Options.Email))
                return !string.IsNullOrEmpty(e.Options!.Instructions);

            return true;
        }

        private bool ObjectiveIsNullIfEmailIsEmpty(ProcessEmailPromptEvent e)
        {
            if (string.IsNullOrEmpty(e.Options.Email))
                return string.IsNullOrEmpty(e.Options!.Objective);

            return true;
        }
    }
}
