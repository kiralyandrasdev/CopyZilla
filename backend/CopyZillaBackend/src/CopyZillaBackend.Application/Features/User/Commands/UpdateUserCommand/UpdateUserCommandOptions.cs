namespace CopyZillaBackend.Application.Features.User.Commands.UpdateUserCommand
{
    public class UpdateUserCommandOptions
    {
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? Email { get; set; }
    }
}