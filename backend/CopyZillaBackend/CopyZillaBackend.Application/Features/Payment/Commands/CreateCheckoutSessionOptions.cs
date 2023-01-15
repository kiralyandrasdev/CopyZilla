using System;
namespace CopyZillaBackend.Application.Features.Payment.Commands
{
	public class CreateCheckoutSessionOptions
	{
		public string FirebaseUid { get; }
        public string PriceId { get; }
        public string Mode { get; }

        public CreateCheckoutSessionOptions(string firebaseUid, string priceId, string mode)
        {
            FirebaseUid = firebaseUid;
            PriceId = priceId;
            Mode = mode;
        }
    }
}

