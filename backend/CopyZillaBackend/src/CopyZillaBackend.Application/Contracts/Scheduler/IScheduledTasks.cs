namespace CopyZillaBackend.Application.Contracts.Scheduler
{
    public interface IScheduledTasks
    {
        Task LoadProductsToCacheAsync();
        Task FlushServiceUsageHistoryTableAsync();
    }
}
