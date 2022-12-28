using System;
using FluentValidation;

namespace CopyZillaGenerator.Function.Events.CreateTextEvent
{
    public class CreateTextEventValidator : AbstractValidator<CreateTextEvent>
    {
        public CreateTextEventValidator()
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