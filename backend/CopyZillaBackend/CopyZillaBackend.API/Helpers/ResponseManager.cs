using CopyZillaBackend.Application.Contracts.Helpers;
using CopyZillaBackend.Application.Features;
using Microsoft.AspNetCore.Mvc;

namespace CopyZillaBackend.API.Helpers
{
    public class ResponseManager : ControllerBase, IResponseManager
    {
        public ActionResult<T> MapActionResult<T>(T response) where T : BaseResponse
        {
            if (!string.IsNullOrEmpty(response.ErrorMessage))
            {
                return new BadRequestObjectResult(response);
            }
            return new OkObjectResult(response);
        }
    }
}
