using FluentValidation;

namespace CopyZillaBackend.Application.Events.ProcessAdvancedPromptEvent
{
    public class ProcessAdvancedPromptEventValidator : AbstractValidator<ProcessAdvancedPromptEvent>
    {
        public ProcessAdvancedPromptEventValidator()
        {
            RuleFor(e => e)
                .Must(e => e.Options != null && !string.IsNullOrEmpty(e.Options.Prompt))
                .WithMessage("Prompt must not be null!")
                .WithErrorCode("400");
            RuleFor(e => e)
                .Must(e => e.Options != null && !string.IsNullOrEmpty(e.Options.Language))
                .WithMessage("Language must not be null!")
                .WithErrorCode("400");
        }
    }
}
