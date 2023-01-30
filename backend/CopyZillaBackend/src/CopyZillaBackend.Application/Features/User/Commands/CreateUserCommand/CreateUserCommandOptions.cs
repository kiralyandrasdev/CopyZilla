using System;
namespace CopyZillaBackend.Application.Features.User.Commands.CreateUserCommand
{
	public class CreateUserCommandOptions
	{
		public string FirebaseUid { get; set; }
        public string Email { get; set; }
        public string? FirstName { get; set; }
		public string? LastName { get; set; }
	}
}

