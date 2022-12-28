using System;
using Microsoft.AspNetCore.Http;

namespace CopyZillaGenerator.Function.Services
{
	public interface IAuthorizationService
	{
		bool Validate(HttpRequest request);
	}
}

