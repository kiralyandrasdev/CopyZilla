using CopyZillaBackend.Application.Common;
using CopyZillaBackend.Application.Contracts.OpenAI;
using CopyZillaBackend.Application.Contracts.Persistence;
using CopyZillaBackend.Application.Contracts.Prompt;
using CopyZillaBackend.Application.Events;
using MediatR;

namespace CopyZillaBackend.Application.Features.Prompt.ProcessEmailPromptEvent
{
    public class ProcessEmailPromptEventHandler : IRequestHandler<ProcessEmailPromptEvent, ProcessEmailPromptEventResult>
    {
        private readonly IUserRepository _repository;
        private readonly IOpenAIService _openAIService;
        private readonly IPromptBuilder _promptBuilder;

        public ProcessEmailPromptEventHandler(IUserRepository repository, IOpenAIService openAIService, IPromptBuilder promptBuilder)
        {
            _repository = repository;
            _openAIService = openAIService;
            _promptBuilder = promptBuilder;
        }

        public async Task<ProcessEmailPromptEventResult> Handle(ProcessEmailPromptEvent request, CancellationToken cancellationToken)
        {
            var result = new ProcessEmailPromptEventResult();

            // Validate if create text options are valid
            var validator = new ProcessEmailPromptEventValidator(_repository);
            var validationResult = await validator.ValidateAsync(request);

            validationResult.Resolve(result);

            // If validation error occurs stop event and return response
            if (!result.Success) return result;

            string prompt = _promptBuilder.Build(request.Options);
            result.Value = await _openAIService.ProcessPrompt(prompt);

            await _repository.DecreaseCreditCount(request.FirebaseUid, 1);

            return result;
        }
    }
}
