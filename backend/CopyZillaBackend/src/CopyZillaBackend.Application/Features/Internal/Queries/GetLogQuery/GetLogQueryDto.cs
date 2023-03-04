namespace CopyZillaBackend.Application.Features.Internal.Queries.GetLogQuery
{
    public class GetLogQueryDto
    {
        public string Type { get; set; }
        public string FileName { get; set; }
        public string Content { get; set; }
        public DateTime CreatedOn { get; set; }
    }
}