using FluentValidation;

namespace CopyZillaBackend.Application.Features.User.Commands.DeleteTemplateCommand
{
    public class DeleteTemplateCommandValidator : AbstractValidator<DeleteTemplateCommand>
    {
        public DeleteTemplateCommandValidator()
        {
           RuleFor(e => e)
            .Must(e => e.UserId != Guid.Empty)
            .WithMessage($"UserId must not be empty.")
            .WithErrorCode("400");

            RuleFor(e => e)
             .Must(e => e.TemplateId != Guid.Empty)
             .WithMessage("TemplateId must not be empty.")
             .WithErrorCode("400");
        }
    }
}