using System;
using FluentValidation;

namespace CopyZillaGenerator.Function.Events.ProcessAdvancedPromptEvent
{
    public class ProcessAdvancedPromptEventValidator : AbstractValidator<ProcessAdvancedPromptEvent>
    {
        public ProcessAdvancedPromptEventValidator()
        {
            RuleFor(e => e)
                .Must(e => e.Options != null && !string.IsNullOrEmpty(e.Options.Prompt))
                .WithMessage("Prompt must not be null!");
            RuleFor(e => e)
                .Must(e => e.Options != null && !string.IsNullOrEmpty(e.Options.Language))
                .WithMessage("Language must not be null!");
        }
    }
}