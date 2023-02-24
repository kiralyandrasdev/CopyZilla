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

            // enable buffering on the request
            context.Request.EnableBuffering();

            // leave the body open for next middlewares/controller
            var json = await new StreamReader(context.Request.Body, leaveOpen: true).ReadToEndAsync();

            // validate stripe event signature
            var stripeEvent = EventUtility.ConstructEvent(json,
                context.Request.Headers["Stripe-Signature"],
                signature);

            if (stripeEvent == null)
                throw new StripeException("Could not verify webhook event.");

            // reset the request body stream position 
            context.Request.Body.Position = 0;

            await next(context);
        }
    }
}
