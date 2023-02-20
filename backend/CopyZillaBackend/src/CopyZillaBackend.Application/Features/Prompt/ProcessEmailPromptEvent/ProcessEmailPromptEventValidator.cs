using FluentValidation;

namespace CopyZillaBackend.Application.Features.Prompt.ProcessEmailPromptEvent
{
    public class ProcessEmailPromptEventValidator : AbstractValidator<ProcessEmailPromptEvent>
    {
        public ProcessEmailPromptEventValidator()
        {
            RuleFor(e => e)
              .Must(e => e.Options != null && !string.IsNullOrEmpty(e.Options.Objective))
              .WithMessage("Objective must not be null!")
              .WithErrorCode("400");
            RuleFor(e => e)
               .Must(e => e.Options != null && !string.IsNullOrEmpty(e.Options.Recipient))
               .WithMessage("Recipient must not be null!")
               .WithErrorCode("400");
            RuleFor(e => e)
               .Must(e => e.Options != null && !string.IsNullOrEmpty(e.Options.Sender))
               .WithMessage("Sender must not be null!")
               .WithErrorCode("400");
            RuleFor(e => e)
               .Must(e => e.Options != null && !string.IsNullOrEmpty(e.Options.CurrentEmail))
               .WithMessage("CurrentEmail must not be null!")
               .WithErrorCode("400");
        }
    }
}
