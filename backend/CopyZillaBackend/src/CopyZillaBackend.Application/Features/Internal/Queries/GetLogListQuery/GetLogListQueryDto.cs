using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CopyZillaBackend.Application.Features.Internal.Queries.GetLogListQuery
{
    public class GetLogListQueryDto
    {
        public string FileName { get; set; }
        public string Type { get; set; }
        public DateTime CreatedOn { get; set; }
    }
}