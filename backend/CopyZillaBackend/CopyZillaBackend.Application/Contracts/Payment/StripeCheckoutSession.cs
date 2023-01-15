using System;
namespace CopyZillaBackend.Application.Contracts.Payment
{
	public class StripeCheckoutSession
	{
		public string CheckoutRedirectUrl { get; }

        public StripeCheckoutSession(string checkoutRedirectUrl)
        {
            CheckoutRedirectUrl = checkoutRedirectUrl;
        }
    }
}

