﻿using CopyZillaBackend.Application.Contracts.Helpers;
using CopyZillaBackend.Application.Events;
using Microsoft.AspNetCore.Mvc;

namespace CopyZillaBackend.API.Helpers
{
    public class ResponseManager : ControllerBase, IResponseManager
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