using System.Net.Http.Headers;
using System.Text;
using System.Text.RegularExpressions;
using CopyZillaBackend.Application.Contracts.OpenAI;
using CopyZillaBackend.Application.Exceptions;
using CopyZillaBackend.Application.Models;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;

namespace CopyZillaBackend.Infrastructure.OpenAI
{
    public class OpenAIService : IOpenAIService
    {
        private readonly IConfiguration _configuration;
        private readonly HttpClient _client;

        public OpenAIService(IConfiguration configuration)
        {
            _configuration = configuration;

            _client = new HttpClient();
            var apiKey = _configuration.GetSection("OpenAI").GetValue<string>("ApiKey");
            _client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", apiKey);
        }

        public async Task<string> ProcessPrompt(string prompt)
        {
            // remove safelinks.protection.outlook.com links from prompt
            string pattern = @"<https?:\/\/[^\s]*safelinks\.protection\.outlook\.com\/\?url=([^&]+)&[^>]+>";
            prompt = Regex.Replace(prompt, pattern, "");

            var payload = new
            {
                model = "text-davinci-003",
                prompt = prompt,
                temperature = 0.4,
                max_tokens = 1000,
            };

            var stringPayload = JsonConvert.SerializeObject(payload);
            var httpContent = new StringContent(stringPayload, Encoding.UTF8, "application/json");

            var response = await _client.PostAsync("https://api.openai.com/v1/completions", httpContent);
            var responseData = await response.Content.ReadAsStringAsync();

            if (!response.IsSuccessStatusCode)
            {
                var error = JsonConvert.DeserializeObject<OpenAIError>(responseData);

                throw new OpenAIException(error.Error.Message);
            }

            var responseMap = JsonConvert.DeserializeObject<OpenAITextCompletionResponse>(responseData);

            var text = responseMap.choices.First().text;

            return text.Substring(2, text.Length - 2);
        }
    }
}
