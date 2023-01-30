using System;
namespace CopyZillaBackend.Application.Features.Payment.Commands
{
    public class CreateCheckoutSessionOptions
    {
        public string FirebaseUid { get; }
        public string PriceId { get; }

        public CreateCheckoutSessionOptions(string firebaseUid, string priceId)
        {
            FirebaseUid = firebaseUid;
            PriceId = priceId;
        }
    }
}

