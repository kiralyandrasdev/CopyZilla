using System;
using CopyZillaGenerator.Function.Events.ProcessAdvancedPromptEvent;
using CopyZillaGenerator.Function.Events.ProcessQuickPromptEvent;

namespace CopyZillaGenerator.Function.Services
{
	public interface IPromptBuilder
	{
		string Build(AdvancedPromptOptions options);
		string Build(QuickPromptOptions options);
	}
}

