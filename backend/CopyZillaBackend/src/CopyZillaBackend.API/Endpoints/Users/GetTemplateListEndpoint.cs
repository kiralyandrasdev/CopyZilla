using CopyZillaBackend.Application.Features.User.Queries.GetSavedTemplateListQuery;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace CopyZillaBackend.API.Endpoints.Users;

public static class GetTemplateListEndpoint
{
    public const string Name = "GetTemplateList";

    public static IEndpointRouteBuilder MapGetTemplateList(this IEndpointRouteBuilder app)
    {
        app.MapGet(ApiEndpoints.Users.GetSavedTemplates, async (
                [FromRoute] Guid userId,
                IMediator mediator) =>
            {
                var result = await mediator.Send(new GetSavedTemplateListQuery(userId));
                return result.MapActionResult();
            })
            .WithName(Name);
        return app;
    }
}