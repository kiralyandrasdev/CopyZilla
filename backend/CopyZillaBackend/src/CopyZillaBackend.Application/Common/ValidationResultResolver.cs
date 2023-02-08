using CopyZillaBackend.Application.Events;
using FluentValidation.Results;

namespace CopyZillaBackend.Application.Common
{
    public static class ValidationResultResolver
    {
        public static ValidationResult ResolveEventResult<T>(this ValidationResult result, T response) where T : BaseEventResult
        {
            if (result.Errors.Count > 0)
            {
                response.ErrorMessage = result.Errors.First().ErrorMessage;
            }
            return result;
        }
    }
}
