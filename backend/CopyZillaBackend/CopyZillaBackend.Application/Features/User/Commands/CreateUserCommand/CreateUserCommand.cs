using System;
using MediatR;

namespace CopyZillaBackend.Application.Features.User.Commands.CreateUserCommand
{
	public class CreateUserCommand : IRequest<CreateUserCommandResult>
	{
		public CreateUserCommandOptions Options { get; }

		public CreateUserCommand(CreateUserCommandOptions options)
		{
			Options = options;
		}
	}
}

