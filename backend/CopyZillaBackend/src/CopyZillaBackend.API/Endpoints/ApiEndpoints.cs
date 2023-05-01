namespace CopyZillaBackend.API.Endpoints;

public class ApiEndpoints
{
    public const string Localhost = "localhost";
    private const string ApiBase = "api";
    
    public static class Users
    {
        private const string Base = $"{ApiBase}/user";

        public const string Create = Base;
        public const string Get = $"{Base}/{{firebaseUid}}";
        public const string Update = $"{Base}/{{userId:guid}}";
        public const string Delete = $"{Base}/{{userId:guid}}";
        public const string SaveTemplate = $"{Base}/{{userId:guid}}/templates";
        public const string GetSavedTemplates = $"{Base}/{{userId:guid}}/templates";
        public const string UpdateTemplate = $"{Base}/{{userId:guid}}/templates/{{templateId:guid}}";        
        public const string DeleteSavedTemplate = $"{Base}/{{userId:guid}}/templates/{{templateId:guid}}";
        public const string SendEmailPrompt = $"{Base}/{{userId:guid}}/emailPrompt";
        public const string SendRephrasePrompt = $"{Base}/{{userId:guid}}/rephrasePrompt";
        public const string CreateSubscriptionCheckoutSession = $"{Base}/{{userId:guid}}/subscription";
    }
    
    public static class Products
    {
        private const string Base = $"{ApiBase}/product";

        public const string GetSubscriptionList = $"{Base}/subscriptions";
    }

    public static class Internal
    {
        private const string Base = $"{ApiBase}/internal";

        public const string GetUsers = $"{Base}/users";
        public const string GetLogList = $"{Base}/logs/{{type:length(24)}}";
        public const string GetLog = $"{Base}/logs/{{type:length(24)}}/{{fileName:length(24)}}";
    }
}