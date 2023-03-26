using CopyZillaBackend.Application.Contracts.Cache;
using CopyZillaBackend.Application.Contracts.OpenAI;
using CopyZillaBackend.Application.Contracts.Persistence;
using CopyZillaBackend.Application.Contracts.Prompt;
using CopyZillaBackend.Application.Contracts.ServiceUsage;
using CopyZillaBackend.Application.Events;
using MediatR;

namespace CopyZillaBackend.Application.Features.Prompt.ProcessEmailPromptEvent
{
    public class ProcessEmailPromptEventHandler : IRequestHandler<ProcessEmailPromptEvent, ProcessEmailPromptEventResult>
    {
        private readonly IUserRepository _repository;
        private readonly IOpenAIService _openAIService;
        private readonly IPromptBuilder _promptBuilder;
        private readonly IProductService _productService;
        private readonly IServiceUsageHistoryRepository _serviceUsageHistoryRepository;

        public ProcessEmailPromptEventHandler(IUserRepository repository, IOpenAIService openAIService, IPromptBuilder promptBuilder, IProductService productService, IServiceUsageHistoryRepository serviceUsageHistoryRepository)
        {
            _repository = repository;
            _openAIService = openAIService;
            _promptBuilder = promptBuilder;
            _productService = productService;
            _serviceUsageHistoryRepository = serviceUsageHistoryRepository;
        }

        public async Task<ProcessEmailPromptEventResult> Handle(ProcessEmailPromptEvent request, CancellationToken cancellationToken)
        {
            var result = new ProcessEmailPromptEventResult();

            // Validate if create text options are valid
            var validator = new ProcessEmailPromptEventValidator(_repository, _productService, _serviceUsageHistoryRepository);
            var validationResult = await validator.ValidateAsync(request);

            validationResult.Resolve(result);

            // If validation error occurs stop event and return response
            if (!result.Success) return result;

            string languagePrompt = _promptBuilder.BuildGetLanguagePrompt(request.Options.Email);
            string language = await _openAIService.ProcessPrompt(languagePrompt);

            string prompt = _promptBuilder.BuildEmailPrompt(language, request.Options);
            result.Value = await _openAIService.ProcessPrompt(prompt);

            await _serviceUsageHistoryRepository.AddServiceUsageHistoryAsync(new Domain.Entities.ServiceUsageHistory()
            {
                UserId = request.UserId,
                ServiceName = "EmailPrompt",
            });

            return result;
        }
    }
}
