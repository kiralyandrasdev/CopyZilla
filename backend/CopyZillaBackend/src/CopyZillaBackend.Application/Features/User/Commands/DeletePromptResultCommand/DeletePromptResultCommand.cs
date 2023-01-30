using System;
using MediatR;

namespace CopyZillaBackend.Application.Features.User.Commands.DeletePromptResultCommand
{
	public class DeletePromptResultCommand : IRequest<DeletePromptResultCommandResult>
	{
		public Guid UserId { get; }
		public Guid PromptResultId { get; }

        public DeletePromptResultCommand(Guid userId, Guid promptResultId)
        {
            UserId = userId;
            PromptResultId = promptResultId;
        }
    }
}

