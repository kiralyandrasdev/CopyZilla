using CopyZillaBackend.Application.Contracts.Cache;
using CopyZillaBackend.Application.Contracts.OpenAI;
using CopyZillaBackend.Application.Contracts.Persistence;
using CopyZillaBackend.Application.Contracts.Prompt;
using CopyZillaBackend.Application.Contracts.ServiceUsage;
using CopyZillaBackend.Application.Events;
using MediatR;

namespace CopyZillaBackend.Application.Features.Prompt.ProcessRephrasePromptEvent
{
    public class ProcessRephrasePromptEventHandler : IRequestHandler<ProcessRephrasePromptEvent, ProcessRephrasePromptEventResult>
    {
        private readonly IUserRepository _repository;
        private readonly IOpenAIService _openAIService;
        private readonly IPromptBuilder _promptBuilder;
        private readonly IProductService _productService;
        private readonly IServiceUsageHistoryRepository _serviceUsageHistoryRepository;

        public ProcessRephrasePromptEventHandler(IUserRepository repository, IOpenAIService openAIService, IPromptBuilder promptBuilder, IProductService productService, IServiceUsageHistoryRepository serviceUsageHistoryRepository)
        {
            _repository = repository;
            _openAIService = openAIService;
            _promptBuilder = promptBuilder;
            _productService = productService;
            _serviceUsageHistoryRepository = serviceUsageHistoryRepository;
        }

        public async Task<ProcessRephrasePromptEventResult> Handle(ProcessRephrasePromptEvent request, CancellationToken cancellationToken)
        {
            var result = new ProcessRephrasePromptEventResult();

            var validator = new ProcessRephrasePromptEventValidator(_repository, _productService, _serviceUsageHistoryRepository);
            var validationResult = await validator.ValidateAsync(request);

            validationResult.Resolve(result);

            if (!result.Success)
                return result;

            string prompt = _promptBuilder.BuildRephrasePrompt(request.Options);
            result.Value = await _openAIService.ProcessPrompt(prompt);

            await _serviceUsageHistoryRepository.AddServiceUsageHistoryAsync(new Domain.Entities.ServiceUsageHistory()
            {
                UserId = request.UserId,
                ServiceName = "RephrasePrompt",
            });

            return result;
        }
    }
}