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

            var request = new OpenAIRequest
            {
                Model = "gpt-3.5-turbo",
                Temperature = 0.4,
                MaxTokens = 1000,
                Messages = new[]
                {
                    new OpenAIRequestMessage
                    { 
                        Role = "system",
                        Content = "You are an email assistant.",
                    },
                    new OpenAIRequestMessage
                    {
                        Role = "user",
                        Content = prompt,
                    }
                }
            };

            var stringPayload = JsonConvert.SerializeObject(request);
            var httpContent = new StringContent(stringPayload, Encoding.UTF8, "application/json");

            var response = await _client.PostAsync("https://api.openai.com/v1/chat/completions", httpContent);
            var responseData = await response.Content.ReadAsStringAsync();

            if (!response.IsSuccessStatusCode)
            {
                var error = JsonConvert.DeserializeObject<OpenAIError>(responseData);

                throw new OpenAIException(error.Error.Message);
            }

            var responseMap = JsonConvert.DeserializeObject<OpenAIResponse>(responseData);

            var text = responseMap.Choices.First().Message.Content;

            return text;
        }
    }
}
