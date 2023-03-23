using System.Diagnostics;

namespace CopyZillaBackend.Application.Exceptions
{
    public class OpenAIException : Exception
    {
        public OpenAIException(string message) : base(message) 
        {
            Trace.TraceError(message);
        }
    }
}
