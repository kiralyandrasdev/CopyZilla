using CopyZillaBackend.Application.Features.User.Queries.GetUserQuery;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace CopyZillaBackend.API.Endpoints.Users;

public static class GetUserEndpoint
{
    public const string Name = "GetUser";

    public static IEndpointRouteBuilder MapGetUser(this IEndpointRouteBuilder app)
    {
        app.MapGet(ApiEndpoints.Users.Get, async (
                [FromRoute] string firebaseUid,
                IMediator mediator) =>
            {
                var result = await mediator.Send(new GetUserQuery(firebaseUid));
                return result.MapActionResult();
            })
            .WithName(Name);
        return app;
    }
}