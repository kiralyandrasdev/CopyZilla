using CopyZillaBackend.Application.Features.User.Commands.UpdateTemplateCommand;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace CopyZillaBackend.API.Endpoints.Users;

public static class UpdateTemplateEndpoint
{
    public const string Name = "UpdateTemplate";

    public static IEndpointRouteBuilder MapUpdateTemplate(this IEndpointRouteBuilder app)
    {
        app.MapPut(ApiEndpoints.Users.UpdateTemplate, async (
                [FromRoute] Guid userId,
                [FromRoute] Guid templateId,
                [FromBody] UpdateTemplateCommandOptions options,
                IMediator mediator) =>
            {
                var result = await mediator.Send(new UpdateTemplateCommand(userId, templateId, options));
                return result.MapActionResult();
            })
            .WithName(Name);
        return app;
    }
}