using CopyZillaBackend.Application.Contracts.OpenAI;
using CopyZillaBackend.Application.Contracts.Persistence;
using CopyZillaBackend.Application.Contracts.Prompt;
using CopyZillaBackend.Application.Events;
using MediatR;

namespace CopyZillaBackend.Application.Features.Prompt.ProcessRephrasePromptEvent
{
    public class ProcessRephrasePromptEventHandler : IRequestHandler<ProcessRephrasePromptEvent, ProcessRephrasePromptEventResult>
    {
        private readonly IUserRepository _repository;
        private readonly IOpenAIService _openAIService;
        private readonly IPromptBuilder _promptBuilder;

        public ProcessRephrasePromptEventHandler(IUserRepository repository, IOpenAIService openAIService, IPromptBuilder promptBuilder)
        {
            _repository = repository;
            _openAIService = openAIService;
            _promptBuilder = promptBuilder;
        }

        public async Task<ProcessRephrasePromptEventResult> Handle(ProcessRephrasePromptEvent request, CancellationToken cancellationToken)
        {
            var result = new ProcessRephrasePromptEventResult();

            var validator = new ProcessRephrasePromptEventValidator(_repository);
            var validationResult = await validator.ValidateAsync(request);

            validationResult.Resolve(result);

            if (!result.Success) 
                return result;

            string prompt = _promptBuilder.Build(request.Options);
            result.Value = await _openAIService.ProcessPrompt(prompt);

            return result;
        }
    }
}