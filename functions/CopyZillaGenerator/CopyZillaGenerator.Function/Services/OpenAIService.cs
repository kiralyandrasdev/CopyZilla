using System;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;
using CopyZillaGenerator.Function.Events.CreateTextEvent;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using CopyZillaGenerator.Function.Exceptions;
using CopyZillaGenerator.Function.Models;
using System.Linq;

namespace CopyZillaGenerator.Function.Services
{
    public class OpenAIService : IOpenAIService
    {
        private readonly IConfiguration _configuration;

        public OpenAIService(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public async Task<string> GenerateText(CreateTextEventOptions options)
        {
            var client = new HttpClient();
            var apiKey = _configuration.GetSection("OpenAI").GetValue<string>("ApiKey");
            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", apiKey);

            string prompt = string.Empty;

            if(options.Language == "hungarian")
            {
                prompt = $"Írj egy {options.Category} szöveget egy {options.Subject}-hez. Magyarul válaszolj!";
            } else
            {
                prompt = $"Write text for a {options.Category} with a subject of {options.Subject} in {options.Style}.";
            }

            var payload = new
            {
                model = "text-davinci-003",
                prompt = prompt,
                temperature = 0,
                max_tokens = 1000,
            };

            var stringPayload = JsonConvert.SerializeObject(payload);
            var httpContent = new StringContent(stringPayload, Encoding.UTF8, "application/json");

            var response = await client.PostAsync("https://api.openai.com/v1/completions", httpContent);
            var responseData = await response.Content.ReadAsStringAsync();

            if(!response.IsSuccessStatusCode)
            {
                throw new OpenAIException(responseData);
            }

            var responseMap = JsonConvert.DeserializeObject<OpenAITextCompletionResponse>(responseData);

            return responseMap.choices.First().text;
        }
    }
}

