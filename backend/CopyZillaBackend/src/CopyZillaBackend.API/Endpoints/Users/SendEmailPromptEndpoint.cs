using CopyZillaBackend.Application.Features.Prompt.ProcessEmailPromptEvent;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace CopyZillaBackend.API.Endpoints.Users;

public static class SendEmailPromptEndpoint
{
    public const string Name = "SendEmailPrompt";

    public static IEndpointRouteBuilder MapSendEmailPrompt(this IEndpointRouteBuilder app)
    {
        app.MapPost(ApiEndpoints.Users.SendEmailPrompt, async (
                [FromRoute] Guid userId,
                [FromBody] ProcessEmailPromptEventOptions options,
                IMediator mediator) =>
            {
                var result = await mediator.Send(new ProcessEmailPromptEvent(userId, options));
                return result.MapActionResult();
            })
            .WithName(Name);
        return app;
    }
}