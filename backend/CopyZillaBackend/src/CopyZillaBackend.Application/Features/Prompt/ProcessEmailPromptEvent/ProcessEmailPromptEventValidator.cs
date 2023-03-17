using CopyZillaBackend.Application.Contracts.Cache;
using CopyZillaBackend.Application.Contracts.Persistence;
using CopyZillaBackend.Application.Contracts.ServiceUsage;
using CopyZillaBackend.Application.Error;
using FluentValidation;

namespace CopyZillaBackend.Application.Features.Prompt.ProcessEmailPromptEvent
{
    public class ProcessEmailPromptEventValidator : AbstractValidator<ProcessEmailPromptEvent>
    {
        private readonly IUserRepository _repository;
        private readonly IProductService _productService;
        private readonly IServiceUsageHistoryRepository _serviceUsageHistoryRepository;

        public ProcessEmailPromptEventValidator(IUserRepository repository, IProductService productService, IServiceUsageHistoryRepository serviceUsageHistoryRepository)
        {
            _repository = repository;
            _serviceUsageHistoryRepository = serviceUsageHistoryRepository;

            RuleFor(e => e)
             .MustAsync(HasEnoughCreditsAsync)
             .WithMessage(ErrorMessages.UsageLimitReached)
             .WithErrorCode("400");
            RuleFor(e => e)
             .Must(InstructionsIsNotNullIfEmailIsEmpty)
             .WithMessage(ErrorMessages.InstructionsMustNotBeNull)
             .WithErrorCode("400");
            RuleFor(e => e)
              .Must(ObjectiveIsNullIfEmailIsEmpty)
              .WithMessage(ErrorMessages.ObjectiveMustBeNull)
              .WithErrorCode("400");
            RuleFor(e => e)
             .Must(e => e.Options != null && !string.IsNullOrEmpty(e.Options.Tone))
             .WithMessage(ErrorMessages.ToneMustNotBeNull)
             .WithErrorCode("400");
            _productService = productService;
        }

        private async Task<bool> HasEnoughCreditsAsync(ProcessEmailPromptEvent e, CancellationToken _)
        {
            var user = await _repository.GetByIdAsync(e.UserId);

            if (user == null)
                return false;

            var product = await _productService.GetProductAsync(user.ProductId);

            var consumedCredits = await _serviceUsageHistoryRepository.GetUserCreditUsageAsync(e.UserId);

            if (consumedCredits >= product.DailyCreditLimit)
                return false;

            return true;
        }

        private bool InstructionsIsNotNullIfEmailIsEmpty(ProcessEmailPromptEvent e)
        {
            if (string.IsNullOrEmpty(e.Options.Email))
                return !string.IsNullOrEmpty(e.Options!.Instructions);

            return true;
        }

        private bool ObjectiveIsNullIfEmailIsEmpty(ProcessEmailPromptEvent e)
        {
            if (string.IsNullOrEmpty(e.Options.Email))
                return string.IsNullOrEmpty(e.Options!.Objective);

            return true;
        }
    }
}
