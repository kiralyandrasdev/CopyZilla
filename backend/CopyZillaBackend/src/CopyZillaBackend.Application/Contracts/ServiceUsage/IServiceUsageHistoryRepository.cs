using CopyZillaBackend.Domain.Entities;

namespace CopyZillaBackend.Application.Contracts.ServiceUsage
{
    public interface IServiceUsageHistoryRepository
    {
        Task AddServiceUsageHistoryAsync(ServiceUsageHistory serviceUsageHistory);
        Task<int> GetUserCreditUsageAsync(Guid userId);
        Task<List<ServiceUsageHistory>> ListAllServiceUsageHistoryAsync();
        Task DeleteServiceUsageHistoryAsync(Guid userId);
    }
}