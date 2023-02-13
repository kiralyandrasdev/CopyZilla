using FluentValidation;
using FluentValidation.Results;

namespace CopyZillaBackend.Application.Events
{
    public static class ValidationResultResolver
    {
        public static ValidationResult Resolve<T>(this ValidationResult result, T response) where T : BaseEventResult
        {
            if (result.Errors.Count > 0)
            {
                response.StatusCode = result.Errors.First().ErrorCode;
                response.ErrorMessage = result.Errors.First().ErrorMessage;

                throw new ValidationException(result.Errors);
            }
            return result;
        }
    }
}
