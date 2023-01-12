using CopyZillaBackend.Application.ViewModels;

namespace CopyZillaBackend.Application.Features.User.Queries
{
    public class GetUserQueryResponse : BaseResponse
    {
        public UserVm User { get; set; }
    }
}
