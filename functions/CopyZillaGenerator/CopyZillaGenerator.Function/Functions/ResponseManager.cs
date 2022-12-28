using System;
using CopyZillaGenerator.Function.Events;
using Microsoft.AspNetCore.Mvc;

namespace CopyZillaGenerator.Function.Functions
{
    public class ResponseManager : ControllerBase
    {
        public ActionResult<T> MapActionResult<T>(T response) where T : BaseEventResult
        {
            if (!string.IsNullOrEmpty(response.ErrorMessage))
            {
                return new BadRequestObjectResult(response);
            }
            return new OkObjectResult(response);
        }
    }
}

