using System;
namespace CopyZillaBackend.Application.Contracts.Webhook
{
	public interface IWebhookEventHandler
	{
		Task ExecuteAsync();
	}
}

