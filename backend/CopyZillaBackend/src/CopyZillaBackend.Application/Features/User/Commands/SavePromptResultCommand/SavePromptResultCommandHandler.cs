using CopyZillaBackend.Application.Contracts.Persistence;
using CopyZillaBackend.Application.Events;
using MediatR;

namespace CopyZillaBackend.Application.Features.User.Commands.SavePromptResultCommand
{
    public class SavePromptResultCommandHandler : IRequestHandler<SavePromptResultCommand, SavePromptResultCommandResult>
    {
        private readonly IUserRepository _repository;

        public SavePromptResultCommandHandler(IUserRepository repository)
        {
            _repository = repository;
        }

        public async Task<SavePromptResultCommandResult> Handle(SavePromptResultCommand request, CancellationToken cancellationToken)
        {
            var result = new SavePromptResultCommandResult();

            var validator = new SavePromptResultCommandValidator(_repository);
            var validationResult = await validator.ValidateAsync(request, cancellationToken);

            validationResult.Resolve(result);

            await _repository.SavePromptResultAsync(request.UserId, request.Options.Title, request.Options.Content);

            return result;
        }
    }
}

