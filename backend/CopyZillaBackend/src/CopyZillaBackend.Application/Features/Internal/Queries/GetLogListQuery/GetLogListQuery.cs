using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MediatR;

namespace CopyZillaBackend.Application.Features.Internal.Queries.GetLogListQuery
{
    public class GetLogListQuery : IRequest<GetLogListQueryResult>
    {
        public string Type { get; }

        public GetLogListQuery(string type)
        {
            Type = type;
        }
    }
}