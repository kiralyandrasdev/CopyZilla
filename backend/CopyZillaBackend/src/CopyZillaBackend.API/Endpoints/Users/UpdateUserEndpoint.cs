using CopyZillaBackend.Application.Features.User.Commands.UpdateUserCommand;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace CopyZillaBackend.API.Endpoints.Users;

public static class UpdateUserEndpoint
{
    public const string Name = "UpdateUser";

    public static IEndpointRouteBuilder MapUpdateUser(this IEndpointRouteBuilder app)
    {
        app.MapPut(ApiEndpoints.Users.Update, async (
                [FromRoute] Guid userId,
                [FromBody] UpdateUserCommandOptions options,
                IMediator mediator) =>
            {
                var result = await mediator.Send(new UpdateUserCommand(userId, options));
                return result.MapActionResult();
            })
            .WithName(Name);
        return app;
    }
}