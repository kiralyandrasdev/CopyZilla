using System;
using MediatR;

namespace CopyZillaBackend.Application.Features.User.Commands.SavePromptResultCommand
{
	public class SavePromptResultCommand : IRequest<SavePromptResultCommandResult>
	{
        public Guid UserId { get; }
		public SavePromptResultCommandOptions Options { get; }

        public SavePromptResultCommand(Guid userId, SavePromptResultCommandOptions options)
        {
            UserId = userId;
            Options = options;
        }
    }
}

