using CopyZillaBackend.Application.Contracts.ServiceUsage;
using CopyZillaBackend.Domain.Entities;

namespace CopyZillaBackend.Persistence.Repositories
{
    public class ServiceUsageHistoryRepository : IServiceUsageHistoryRepository
    {
        private readonly CopyZillaBackendDBContext _context;

        public ServiceUsageHistoryRepository(CopyZillaBackendDBContext context)
        {
            _context = context;
        }

        public async Task AddServiceUsageHistoryAsync(ServiceUsageHistory serviceUsageHistory)
        {
            await _context.ServiceUsageHistory.AddAsync(serviceUsageHistory);
            await _context.SaveChangesAsync();
        }

        public Task<int> GetUserCreditUsageAsync(Guid userId)
        {
            // Get the total number of credits used by the user for the current day
            var utcNow = DateTime.UtcNow;

            var totalCreditsUsed = _context.ServiceUsageHistory
                .Where(x => x.UserId == userId &&
                x.CreatedOn.Day == utcNow.Day
                && x.CreatedOn.Month == utcNow.Month
                && x.CreatedOn.Year == utcNow.Year)
                .Count();

            return Task.FromResult(totalCreditsUsed);
        }
    }
}