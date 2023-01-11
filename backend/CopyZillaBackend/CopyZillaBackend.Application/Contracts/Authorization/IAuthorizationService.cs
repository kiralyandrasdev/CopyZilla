using Microsoft.AspNetCore.Http;

namespace CopyZillaBackend.Application.Contracts.Authorization
{
    public interface IAuthorizationService
    {
        bool Validate(HttpRequest request);
    }
}
