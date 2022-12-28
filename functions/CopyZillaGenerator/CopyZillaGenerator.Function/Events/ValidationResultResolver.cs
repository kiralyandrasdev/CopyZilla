using System;
using System.Diagnostics;
using System.Linq;
using FluentValidation;
using FluentValidation.Results;

namespace CopyZillaGenerator.Function.Events
{
    public static class ValidationResultResolver
    {
        public static ValidationResult Resolve<T>(this ValidationResult result, T response) where T : BaseEventResult
        {
            if (result.Errors.Count > 0)
            {
                response.ErrorMessage = result.Errors.First().ErrorMessage;
            }
            return result;
        }
    }
}

