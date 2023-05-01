using System;

namespace CopyZillaBackend.Application.Features.User.Commands.CreateUserCommand
{
	public class CreateUserCommandResult : BaseEventResult
	{
		public Domain.Entities.User? Value { get; set; }
	}
}

