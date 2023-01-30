using CopyZillaBackend.Application.Events;
using CopyZillaBackend.Application.Features;
using Microsoft.AspNetCore.Mvc;

namespace CopyZillaBackend.Application.Contracts.Helpers
{
    public interface IResponseManager
    {
        ActionResult<T> MapActionResult<T>(T response) where T : BaseEventResult;
    }
}
