using CopyZillaBackend.Application.Features.Prompt.ProcessRephrasePromptEvent;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace CopyZillaBackend.API.Endpoints.Users;

public static class SendRephrasePromptEndpoint
{
    public const string Name = "SendRephrasePrompt";

    public static IEndpointRouteBuilder MapSendRephrasePrompt(this IEndpointRouteBuilder app)
    {
        app.MapPost(ApiEndpoints.Users.SendRephrasePrompt, async (
                [FromRoute] Guid userId,
                [FromBody] ProcessRephrasePromptEventOptions options,
                IMediator mediator) =>
            {
                var result = await mediator.Send(new ProcessRephrasePromptEvent(userId, options));
                return result.MapActionResult();
            })
            .WithName(Name);
        return app;
    }
}