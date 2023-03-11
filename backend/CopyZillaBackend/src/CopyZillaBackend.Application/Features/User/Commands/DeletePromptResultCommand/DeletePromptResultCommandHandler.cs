using CopyZillaBackend.Application.Contracts.Persistence;
using CopyZillaBackend.Application.Events;
using CopyZillaBackend.Domain.Entities;
using MediatR;

namespace CopyZillaBackend.Application.Features.User.Commands.DeletePromptResultCommand
{
    public class DeletePromptResultCommandHandler : IRequestHandler<DeletePromptResultCommand, DeletePromptResultCommandResult>
	{
        private readonly IMongoRepository<PromptResult> _repository;

        public DeletePromptResultCommandHandler(IMongoRepository<PromptResult> repository)
        {
            _repository = repository;
        }

        public async Task<DeletePromptResultCommandResult> Handle(DeletePromptResultCommand request, CancellationToken cancellationToken)
        {
            var result = new DeletePromptResultCommandResult();

            var validator = new DeletePromptResultCommandValidator();
            var validationResult = await validator.ValidateAsync(request, cancellationToken);

            validationResult.Resolve(result);

            await _repository.DeleteEntityAsync(request.UserId, request.PromptResultId);

            return result;
        }
    }
}

