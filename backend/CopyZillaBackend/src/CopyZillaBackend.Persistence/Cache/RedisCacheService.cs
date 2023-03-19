using CopyZillaBackend.Application.Contracts.Persistence;
using Newtonsoft.Json;
using StackExchange.Redis;

namespace CopyZillaBackend.Persistence.Cache
{
    public class RedisCacheService : ICacheService
    {
        private readonly IConnectionMultiplexer _connection;
        private readonly IDatabase _cache;

        public RedisCacheService(IConnectionMultiplexer connection)
        {
            _connection = connection;
            _cache = _connection.GetDatabase();
        }

        public async Task SetAsync<T>(string key, T value)
        {
            var serializedValue = JsonConvert.SerializeObject(value);
            await _cache.StringSetAsync(key, serializedValue);
        }
        
        public async Task<T?> GetAsync<T>(string key)
        {
            var value = await _cache.StringGetAsync(key);
            return value.HasValue ? JsonConvert.DeserializeObject<T>(value) : default;
        }

        public async Task<List<T>> GetAllValuesOfTypeAsync<T>()
        {
            var keys = GetKeys();
            var values = await _cache.StringGetAsync(keys.Select(k => (RedisKey)k).ToArray());

            var result = new List<T>();

            for (var i = 0; i < keys.Count; i++)
            {
                if (values[i].HasValue)
                {
                    var deserializedValue = JsonConvert.DeserializeObject<T>(values[i]);
                    if (deserializedValue != null)
                        result.Add(deserializedValue);
                }
            }

            return result;
        }

        public async Task RemoveAsync(string key)
        {
            var keyExists = await _cache.KeyExistsAsync(key);
            if (keyExists)
                await _cache.KeyDeleteAsync(key);
        }

        private List<string> GetKeys()
        {
            var keys = new List<string>();
            var endpoint = _cache.Multiplexer.GetEndPoints().First();
            var server = _cache.Multiplexer.GetServer(endpoint);

            foreach (var key in server.Keys(pattern: "*"))
                keys.Add(key.ToString());

            return keys;
        }
    }
}