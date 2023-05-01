using MediatR;
using Microsoft.Extensions.Logging;

namespace CopyZillaBackend.Application.Mediator;

public class LoggingBehavior<TRequest, TResponse> : IPipelineBehavior<TRequest, TResponse> where TRequest : notnull
{
    private readonly ILogger<LoggingBehavior<TRequest,TResponse>> _logger;

    public LoggingBehavior(ILogger<LoggingBehavior<TRequest, TResponse>> logger)
    {
        _logger = logger;
    }

    public async Task<TResponse> Handle(TRequest request,
        RequestHandlerDelegate<TResponse> next,
        CancellationToken cancellationToken)
    {
        _logger.LogInformation("{RequestType} executed at {Now}", typeof(TRequest).Name, DateTime.Now);
        var response = await next();
        
        return response;
    }
}