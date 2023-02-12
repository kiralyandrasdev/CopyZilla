using FluentValidation;

namespace CopyZillaBackend.Application.Features.User.Commands.DeletePromptResultCommand
{
    public class DeletePromptResultCommandValidator : AbstractValidator<DeletePromptResultCommand>
    {
        public DeletePromptResultCommandValidator()
        {
            RuleFor(e => e)
            .Must(e => e.UserId != Guid.Empty)
            .WithMessage($"UserId must not be empty.")
            .WithErrorCode("400");

            RuleFor(e => e)
           .Must(e => e.PromptResultId != Guid.Empty)
           .WithMessage("PromptResultId must not be empty.")
           .WithErrorCode("400");
        }
    }
}
