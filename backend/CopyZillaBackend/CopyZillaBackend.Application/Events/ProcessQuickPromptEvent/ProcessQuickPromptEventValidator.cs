using FluentValidation;

namespace CopyZillaBackend.Application.Events.ProcessQuickPromptEvent
{
    public class ProcessQuickPromptEventValidator : AbstractValidator<ProcessQuickPromptEvent>
    {
        public ProcessQuickPromptEventValidator()
        {
            RuleFor(e => e)
                .Must(e => e.Options != null && !string.IsNullOrEmpty(e.Options.Subject))
                .WithMessage("Subject must not be null!");
            RuleFor(e => e)
                .Must(e => e.Options != null && !string.IsNullOrEmpty(e.Options.Category))
                .WithMessage("Category must not be null!");
            RuleFor(e => e)
                .Must(e => e.Options != null && !string.IsNullOrEmpty(e.Options.Style))
                .WithMessage("Mood must not be null!");
            RuleFor(e => e)
                .Must(e => e.Options != null && !string.IsNullOrEmpty(e.Options.Language))
                .WithMessage("Language must not be null!");
        }
    }
}
