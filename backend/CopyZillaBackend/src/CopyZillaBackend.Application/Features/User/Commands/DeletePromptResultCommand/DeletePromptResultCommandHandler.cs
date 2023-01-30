using System;
using CopyZillaBackend.Application.Contracts.Persistence;
using MediatR;

namespace CopyZillaBackend.Application.Features.User.Commands.DeletePromptResultCommand
{
	public class DeletePromptResultCommandHandler : IRequestHandler<DeletePromptResultCommand, DeletePromptResultCommandResult>
	{
        private readonly IUserRepository _repository;

        public DeletePromptResultCommandHandler(IUserRepository repository)
        {
            _repository = repository;
        }

        public async Task<DeletePromptResultCommandResult> Handle(DeletePromptResultCommand request, CancellationToken cancellationToken)
        {
            var result = new DeletePromptResultCommandResult();

            await _repository.DeletePromptResultAsync(request.UserId, request.PromptResultId);

            return result;
        }
    }
}

