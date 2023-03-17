using CopyZillaBackend.Application.Error;
using FluentValidation;

namespace CopyZillaBackend.Application.Features.User.Commands.DeleteTemplateCommand
{
    public class DeleteTemplateCommandValidator : AbstractValidator<DeleteTemplateCommand>
    {
        public DeleteTemplateCommandValidator()
        {
           RuleFor(e => e)
            .Must(e => e.UserId != Guid.Empty)
            .WithMessage(ErrorMessages.UserIdMustNotBeNull)
            .WithErrorCode("400");

            RuleFor(e => e)
             .Must(e => e.TemplateId != Guid.Empty)
             .WithMessage(ErrorMessages.TemplateIdMustNotBeNull)
             .WithErrorCode("400");
        }
    }
}