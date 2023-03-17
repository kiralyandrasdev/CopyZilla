using CopyZillaBackend.Domain.Entities;

namespace CopyZillaBackend.Application.Contracts.ServiceUsage
{
    public interface IServiceUsageHistoryRepository
    {
        Task<int> GetUserCreditUsageAsync(Guid userId);
        Task AddServiceUsageHistoryAsync(ServiceUsageHistory serviceUsageHistory);
    }
}