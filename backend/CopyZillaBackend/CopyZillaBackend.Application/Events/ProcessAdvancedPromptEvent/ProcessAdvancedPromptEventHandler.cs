using CopyZillaBackend.Application.Common;
using CopyZillaBackend.Application.Contracts.OpenAI;
using CopyZillaBackend.Application.Contracts.Prompt;
using MediatR;
using Microsoft.Extensions.Configuration;

namespace CopyZillaBackend.Application.Events.ProcessAdvancedPromptEvent
{
    public class ProcessAdvancedPromptEventHandler : IRequestHandler<ProcessAdvancedPromptEvent, ProcessAdvancedPromptEventResult>
    {
        private readonly IConfiguration _configuration;
        private readonly IOpenAIService _openAIService;
        private readonly IPromptBuilder _promptBuilder;

        public ProcessAdvancedPromptEventHandler(IConfiguration configuration, IOpenAIService openAIService, IPromptBuilder promptBuilder)
        {
            _configuration = configuration;
            _openAIService = openAIService;
            _promptBuilder = promptBuilder;
        }

        public async Task<ProcessAdvancedPromptEventResult> Handle(ProcessAdvancedPromptEvent request, CancellationToken cancellationToken)
        {
            var result = new ProcessAdvancedPromptEventResult();

            // Validate if create text options are valid
            var validator = new ProcessAdvancedPromptEventValidator();
            var validationResult = validator.Validate(request);

            validationResult.ResolveEventResult(result);

            // If validation error occurs stop event and return response
            if (!result.Success) return result;

            string prompt = _promptBuilder.Build(request.Options);
            result.Value = await _openAIService.ProcessPrompt(prompt);

            return result;
        }
    }
}
