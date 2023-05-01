using CopyZillaBackend.Application.Features.User.Commands.CreateUserCommand;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace CopyZillaBackend.API.Endpoints.Users;

public static class CreateUserEndpoint
{
    public const string Name = "CreateUser";

    public static IEndpointRouteBuilder MapCreateUser(this IEndpointRouteBuilder app)
    {
        app.MapPost(ApiEndpoints.Users.Create, async (
                [FromBody] CreateUserCommandOptions options,
                IMediator mediator) =>
            {
                var result = await mediator.Send(new CreateUserCommand(options));
                return result.MapActionResult();
            })
            .WithName(Name);
        return app;
    }
}