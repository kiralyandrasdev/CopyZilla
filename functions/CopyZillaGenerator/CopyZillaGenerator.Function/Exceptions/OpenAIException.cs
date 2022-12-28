using System;
using System.Diagnostics;

namespace CopyZillaGenerator.Function.Exceptions
{
	public class OpenAIException : Exception
	{
		public OpenAIException(string message) : base("Text generation error occured.")
		{
			Trace.TraceError(message);
		}
	}
}

