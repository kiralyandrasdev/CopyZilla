using Stripe;

namespace CopyZillaBackend.API.Middlewares
{
    public class StripeWebhookMiddleware : IMiddleware
    {
        private readonly IConfiguration _configuration;

        public StripeWebhookMiddleware(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public async Task InvokeAsync(HttpContext context, RequestDelegate next)
        {
            var signature = _configuration.GetSection("Stripe").GetValue<string>("EndpointSecret");

            var json = await new StreamReader(context.Request.Body).ReadToEndAsync();

            var stripeEvent = EventUtility.ConstructEvent(json,
                context.Request.Headers["Stripe-Signature"], 
                signature);

            if (stripeEvent == null)
            {
                throw new StripeException("Could not verify webhook event.");
            }

            await next(context);
        }
    }
}
