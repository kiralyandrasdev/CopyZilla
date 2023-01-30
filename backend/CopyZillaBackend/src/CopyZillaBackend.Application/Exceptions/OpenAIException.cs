using System.Diagnostics;

namespace CopyZillaBackend.Application.Exceptions
{
    public class OpenAIException : Exception
    {
        public OpenAIException(string message) : base("Text generation error occured.")
        {
            Trace.TraceError(message);
        }
    }
}
