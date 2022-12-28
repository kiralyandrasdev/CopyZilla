using System;
using System.Threading.Tasks;
using CopyZillaGenerator.Function.Events.CreateTextEvent;

namespace CopyZillaGenerator.Function.Services
{
	public interface IOpenAIService
	{
		Task<string> GenerateText(CreateTextEventOptions options);
	}
}

