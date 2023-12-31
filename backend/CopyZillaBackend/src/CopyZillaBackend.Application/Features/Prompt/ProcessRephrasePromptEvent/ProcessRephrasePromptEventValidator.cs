using CopyZillaBackend.Application.Contracts.Cache;
using CopyZillaBackend.Application.Contracts.Persistence;
using CopyZillaBackend.Application.Contracts.ServiceUsage;
using CopyZillaBackend.Application.Error;
using FluentValidation;

namespace CopyZillaBackend.Application.Features.Prompt.ProcessRephrasePromptEvent
{
    public class ProcessRephrasePromptEventValidator : AbstractValidator<ProcessRephrasePromptEvent>
    {
        private readonly IUserRepository _repository;
        private readonly IProductService _productService;
        private readonly IServiceUsageHistoryRepository _serviceUsageHistoryRepository;

        public ProcessRephrasePromptEventValidator(IUserRepository repository, IProductService productService, IServiceUsageHistoryRepository serviceUsageHistoryRepository)
        {
            _repository = repository;
            _productService = productService;
            _serviceUsageHistoryRepository = serviceUsageHistoryRepository;

            RuleFor(e => e)
            .MustAsync(UserExistsAsync)
            .WithErrorCode("404")
            .WithMessage(ErrorMessages.UserNotFound);

            RuleFor(e => e)
              .MustAsync(SubscriptionIsTrialingOrActive)
              .WithMessage(ErrorMessages.PlanNeedsActivation)
              .WithErrorCode("400");

            RuleFor(e => e)
              .MustAsync(HasEnoughCreditsAsync)
              .WithMessage(ErrorMessages.UsageLimitReached)
              .WithErrorCode("400");

            RuleFor(e => e)
             .Must(e => !string.IsNullOrEmpty(e.Options.Objective))
             .WithMessage(ErrorMessages.ObjectiveMustNotBeNull)
             .WithErrorCode("400");

            RuleFor(e => e)
             .Must(e => !string.IsNullOrEmpty(e.Options.Text))
             .WithMessage(ErrorMessages.TextMustNotBeNull)
             .WithErrorCode("400");
        }

        private async Task<bool> UserExistsAsync(ProcessRephrasePromptEvent e, CancellationToken _)
        {
            return await _repository.ExistsAsync(e.UserId);
        }

        private async Task<bool> HasEnoughCreditsAsync(ProcessRephrasePromptEvent e, CancellationToken _)
        {
            var user = await _repository.GetByIdAsync(e.UserId);

            if (string.IsNullOrEmpty(user.ProductId))
                throw new ValidationException(ErrorMessages.UserHasNoPlanAssigned);

            var product = await _productService.GetProductAsync(user.ProductId);

            var consumedCredits = await _serviceUsageHistoryRepository.GetUserCreditUsageAsync(e.UserId);

            if (consumedCredits >= product.DailyCreditLimit)
                return false;

            return true;
        }

        private async Task<bool> SubscriptionIsTrialingOrActive(ProcessRephrasePromptEvent e, CancellationToken _)
        {
            var user = await _repository.GetByIdAsync(e.UserId);

            if (user!.SubscriptionStatus == "trialing" || user.SubscriptionStatus == "active")
                return true;

            return false;
        }
    }
}