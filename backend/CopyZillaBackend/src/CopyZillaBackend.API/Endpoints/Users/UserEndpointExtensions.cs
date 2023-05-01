namespace CopyZillaBackend.API.Endpoints.Users;

public static class UserEndpointExtensions
{
    public static IEndpointRouteBuilder MapUserEndpoints(this IEndpointRouteBuilder app)
    {
        app.MapCreateUser();
        app.MapGetUser();
        app.MapUpdateUser();
        app.MapDeleteUser();
        app.MapSendEmailPrompt();
        app.MapSendRephrasePrompt();
        app.MapSaveTemplate();
        app.MapGetTemplateList();
        app.MapUpdateTemplate();
        app.MapDeleteTemplate();
        app.MapCreateSubscriptionCheckoutSession();
        
        return app;
    }
}