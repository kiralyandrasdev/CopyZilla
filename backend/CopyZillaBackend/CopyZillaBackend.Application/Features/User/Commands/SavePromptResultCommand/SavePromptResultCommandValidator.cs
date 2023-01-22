using System;
using CopyZillaBackend.Application.Contracts.Persistence;
using FluentValidation;

namespace CopyZillaBackend.Application.Features.User.Commands.SavePromptResultCommand
{
	public class SavePromptResultCommandValidator : AbstractValidator<SavePromptResultCommand>
	{
		private readonly IUserRepository _repository;

        public SavePromptResultCommandValidator(IUserRepository repository)
        {
            _repository = repository;

            RuleFor(e => e)
                .Must(e => e.UserId != Guid.Empty)
                .WithMessage("UserId must not be empty.");

            RuleFor(e => e)
               .Must(e => !string.IsNullOrEmpty(e.Options.Content))
               .WithMessage("Content must not be empty.");

            RuleFor(e => e)
                .MustAsync(ExistsAsync)
                .WithMessage("User with specified UserId does not exist.");
        }

        private async Task<bool> ExistsAsync(SavePromptResultCommand e, CancellationToken _)
        {
            return await _repository.ExistsAsync(e.UserId);
        }
    }
}

