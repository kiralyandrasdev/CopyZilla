using CopyZillaBackend.Application.Features.User.Commands.SaveTemplateCommand;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace CopyZillaBackend.API.Endpoints.Users;

public static class SaveTemplateEndpoint
{
    public const string Name = "SaveTemplate";

    public static IEndpointRouteBuilder MapSaveTemplate(this IEndpointRouteBuilder app)
    {
        app.MapPost(ApiEndpoints.Users.SaveTemplate, async (
                [FromRoute] Guid userId,
                [FromBody] SaveTemplateCommandOptions options,
                IMediator mediator) =>
            {
                var result = await mediator.Send(new SaveTemplateCommand(userId, options));
                return result.MapActionResult();
            })
            .WithName(Name);
        return app;
    }
}