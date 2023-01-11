using CopyZillaBackend.Application.Events;
using Microsoft.AspNetCore.Mvc;

namespace CopyZillaBackend.Application.Contracts.Common
{
    public interface IResponseManager
    {
        ActionResult<T> MapActionResult<T>(T response) where T : BaseEventResult;
    }
}
