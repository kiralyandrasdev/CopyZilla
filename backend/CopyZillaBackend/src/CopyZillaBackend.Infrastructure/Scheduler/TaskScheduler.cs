using CopyZillaBackend.Application.Contracts.Logging;
using CopyZillaBackend.Application.Contracts.Scheduler;
using FluentScheduler;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;

namespace CopyZillaBackend.Infrastructure.Scheduler
{
    public class TaskScheduler : Registry
    {
        public TaskScheduler(IServiceCollection services)
        {
            Schedule(async () =>
            {
                var sp = services.BuildServiceProvider();

                using var scope = sp.CreateScope();

                var scheduledTasks = scope.ServiceProvider.GetRequiredService<IScheduledTasks>();
                var cloudLogBuilder = scope.ServiceProvider.GetRequiredService<ICloudLogBuilder>();
                var cloudLogService = scope.ServiceProvider.GetRequiredService<ICloudLogService>();

                try
                {
                    await scheduledTasks.LoadProductsToCacheAsync();
                }
                catch (Exception e)
                {
                    string log = cloudLogBuilder.BuildErrorLog(null, e);
                    await cloudLogService.WriteLogAsync(log, LogLevel.Error);
                }
            }).ToRunNow().AndEvery(30).Minutes();

            Schedule(async () =>
            {
                var sp = services.BuildServiceProvider();

                using var scope = sp.CreateScope();

                var scheduledTasks = scope.ServiceProvider.GetRequiredService<IScheduledTasks>();
                var cloudLogBuilder = scope.ServiceProvider.GetRequiredService<ICloudLogBuilder>();
                var cloudLogService = scope.ServiceProvider.GetRequiredService<ICloudLogService>();

                try
                {
                    await scheduledTasks.FlushServiceUsageHistoryTableAsync();
                }
                catch (Exception e)
                {
                    string log = cloudLogBuilder.BuildErrorLog(null, e);
                    await cloudLogService.WriteLogAsync(log, LogLevel.Error);
                }
            }).ToRunEvery(1).Days().At(0,0);
        }
    }
}
