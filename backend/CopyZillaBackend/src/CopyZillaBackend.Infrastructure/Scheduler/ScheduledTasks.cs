using CopyZillaBackend.Application.Contracts.Cache;
using CopyZillaBackend.Application.Contracts.Scheduler;
using CopyZillaBackend.Application.Contracts.ServiceUsage;

namespace CopyZillaBackend.Infrastructure.Scheduler
{
    public class ScheduledTasks : IScheduledTasks
    {
        private readonly IProductService _productService;
        private readonly IServiceUsageHistoryRepository _serviceUsageHistoryRepository;

        public ScheduledTasks(IProductService productService, IServiceUsageHistoryRepository serviceUsageHistoryRepository)
        {
            _productService = productService;
            _serviceUsageHistoryRepository = serviceUsageHistoryRepository;
        }

        public async Task LoadProductsToCacheAsync()
        {
            await _productService.LoadProductsToCacheAsync();
        }

        public async Task FlushServiceUsageHistoryTableAsync()
        {
            var usageHistoryList = await _serviceUsageHistoryRepository.ListAllServiceUsageHistoryAsync();

            var yesterday = DateTime.Today.AddDays(-1);
            usageHistoryList = usageHistoryList
                .Where(e => e.CreatedOn.Day == yesterday.Day
                       && e.CreatedOn.Month == yesterday.Month
                       && e.CreatedOn.Year == yesterday.Year).ToList();

            foreach (var usageHistory in usageHistoryList)
            {
                await _serviceUsageHistoryRepository.DeleteServiceUsageHistoryAsync(usageHistory.UserId);
            }
        }
    }
}
