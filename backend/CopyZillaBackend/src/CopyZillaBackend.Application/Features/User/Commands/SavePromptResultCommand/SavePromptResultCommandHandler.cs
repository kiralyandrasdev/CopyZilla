using System;
using CopyZillaBackend.Application.Contracts.Persistence;
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

            await _repository.SavePromptResultAsync(request.UserId, request.Options.Title, request.Options.Content);

            return result;
        }
    }
}

