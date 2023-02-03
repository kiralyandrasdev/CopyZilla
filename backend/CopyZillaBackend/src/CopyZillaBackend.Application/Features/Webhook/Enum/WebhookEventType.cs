namespace CopyZillaBackend.Application.Webhook.Enum
{
    public enum WebhookEventType
    {
        CheckoutSessionCompleted,
        InvoicePaymentSucceeded,
        CustomerSubscriptionCreated,
        CustomerSubscriptionUpdated,
        CustomerSubscriptionDeleted,
        CustomerSubscriptionTrialWillEnd,
        InvoicePaymentFailed,
        InvoicePaymentActionRequired,
    }
}

