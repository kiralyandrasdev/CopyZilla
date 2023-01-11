using CopyZillaBackend.Application.Contracts.OpenAI;
using CopyZillaBackend.Application.Exceptions;
using CopyZillaBackend.Application.Models;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using System.Net.Http.Headers;
using System.Text;

namespace CopyZillaBackend.Infrastructure.OpenAI
{
    public class OpenAIService : IOpenAIService
    {
        private readonly IConfiguration _configuration;

        public OpenAIService(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public async Task<string> ProcessPrompt(string prompt)
        {
            var client = new HttpClient();
            var apiKey = _configuration.GetSection("OpenAI").GetValue<string>("ApiKey");
            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", apiKey);

            var payload = new
            {
                model = "text-davinci-003",
                prompt = prompt,
                temperature = 0.4,
                max_tokens = 1000,
            };

            var stringPayload = JsonConvert.SerializeObject(payload);
            var httpContent = new StringContent(stringPayload, Encoding.UTF8, "application/json");

            var response = await client.PostAsync("https://api.openai.com/v1/completions", httpContent);
            var responseData = await response.Content.ReadAsStringAsync();

            if (!response.IsSuccessStatusCode)
            {
                throw new OpenAIException(responseData);
            }

            var responseMap = JsonConvert.DeserializeObject<OpenAITextCompletionResponse>(responseData);

            return responseMap.choices.First().text;
        }
    }
}
