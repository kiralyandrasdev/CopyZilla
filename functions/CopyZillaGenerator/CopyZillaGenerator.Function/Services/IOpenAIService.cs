using System;
using System.Threading.Tasks;
using CopyZillaGenerator.Function.Events.ProcessQuickPromptEvent;

namespace CopyZillaGenerator.Function.Services
{
	public interface IOpenAIService
	{
		Task<string> ProcessPrompt(string prompt);
	}
}

