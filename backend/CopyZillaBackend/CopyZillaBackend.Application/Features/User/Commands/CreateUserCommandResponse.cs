using CopyZillaBackend.Application.ViewModels;

namespace CopyZillaBackend.Application.Features.User.Commands
{
    public class CreateUserCommandResponse : BaseResponse
    {
        public UserVm User { get; set; }
    }
}
