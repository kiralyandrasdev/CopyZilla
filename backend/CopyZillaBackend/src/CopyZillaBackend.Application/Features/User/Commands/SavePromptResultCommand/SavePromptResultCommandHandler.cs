using CopyZillaBackend.Application.Contracts.Persistence;
using CopyZillaBackend.Application.Events;
using CopyZillaBackend.Domain.Entities;
using MediatR;

namespace CopyZillaBackend.Application.Features.User.Commands.SavePromptResultCommand
{
    public class SavePromptResultCommandHandler : IRequestHandler<SavePromptResultCommand, SavePromptResultCommandResult>
    {
        private readonly IMongoRepository _mongoRepository;
        private readonly IUserRepository _userRepository;

        public SavePromptResultCommandHandler(IMongoRepository mongoRepository, IUserRepository userRepository)
        {
            _mongoRepository = mongoRepository;
            _userRepository = userRepository;
        }

        public async Task<SavePromptResultCommandResult> Handle(SavePromptResultCommand request, CancellationToken cancellationToken)
        {
            var result = new SavePromptResultCommandResult();

            var validator = new SavePromptResultCommandValidator(_userRepository);
            var validationResult = await validator.ValidateAsync(request, cancellationToken);

            validationResult.Resolve(result);

            if (!result.Success)
                return result;

            var promptResult = new PromptResult()
            {
                UserId = request.UserId,
                Title = request!.Options!.Title!,
                Content = request.Options.Content
            };

            await _mongoRepository.AddAsync(promptResult);

            return result;
        }
    }
}

