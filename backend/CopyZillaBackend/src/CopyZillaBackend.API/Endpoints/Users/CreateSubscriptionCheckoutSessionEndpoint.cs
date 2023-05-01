using CopyZillaBackend.Application.Features.Payment.Commands;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace CopyZillaBackend.API.Endpoints.Users;

public static class CreateSubscriptionCheckoutSessionEndpoint
{
    public const string Name = "CreateSubscriptionCheckoutSession";

    public static IEndpointRouteBuilder MapCreateSubscriptionCheckoutSession(this IEndpointRouteBuilder app)
    {
        app.MapPost(ApiEndpoints.Users.CreateSubscriptionCheckoutSession, async (
                [FromRoute] Guid userId,
                IMediator mediator) =>
            {
                var result = await mediator.Send(new CreateSubscriptionCommand(userId));
                return result.MapActionResult();
            })
            .WithName(Name);
        return app;
    }
}