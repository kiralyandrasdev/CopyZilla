using MediatR;

namespace CopyZillaBackend.Application.Features.Internal.Queries.GetLogQuery
{
    public class GetLogQuery : IRequest<GetLogQueryResult>
    {
        public string Type { get; }
        public string FileName { get; }

        public GetLogQuery(string type, string fileName)
        {
            Type = type;
            FileName = fileName;
        }
    }
}