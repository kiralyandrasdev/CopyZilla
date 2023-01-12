namespace CopyZillaBackend.Application.Features
{
    public class BaseResponse
    {
        public bool Success { get; set; }
        public string ErrorMessage { get; set; }
        public bool HadErrors { get; set; }
        public List<string> ValidationErrors { get; set; } = new List<string>();

        public BaseResponse()
        {
            Success = true;
        }

        public BaseResponse(bool success, string message)
        {
            Success = success;
            ErrorMessage = message;
        }
    }
}
