using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CopyZillaBackend.Application.Events.ProcessQuickPromptEvent
{
    public sealed class ProcessQuickPromptEventResult : BaseEventResult
    {
        public string Value { get; set; }
    }
}
