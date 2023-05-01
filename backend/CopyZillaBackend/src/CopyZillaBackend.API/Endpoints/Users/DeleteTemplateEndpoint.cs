using CopyZillaBackend.Application.Features.User.Commands.DeleteUserCommand;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace CopyZillaBackend.API.Endpoints.Users;

public static class DeleteTemplateEndpoint
{
    public const string Name = "DeleteTemplate";

    public static IEndpointRouteBuilder MapDeleteTemplate(this IEndpointRouteBuilder app)
    {
        app.MapDelete(ApiEndpoints.Users.Delete, async (
                [FromRoute] Guid userId,
                IMediator mediator) =>
            {
                var result = await mediator.Send(new DeleteUserCommand(userId));
                return result.MapActionResult();
            })
            .WithName(Name);
        return app;
    }
}