using System;
using CopyZillaBackend.Application.Mediator;
using MediatR;

namespace CopyZillaBackend.Application.Features.User.Commands.CreateUserCommand
{
	public class CreateUserCommand : IValidatableRequest<CreateUserCommandResult>
	{
		public CreateUserCommandOptions Options { get; }

		public CreateUserCommand(CreateUserCommandOptions options)
		{
			Options = options;
		}
	}
}

