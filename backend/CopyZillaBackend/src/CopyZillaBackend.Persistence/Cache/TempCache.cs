using CopyZillaBackend.Domain.Entities;

namespace CopyZillaBackend.Persistence.Cache
{
    public static class TempCache
    {
        public static Dictionary<string, Product> ProductCache { get; } = new Dictionary<string, Product>();
    }
}