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
using Microsoft.WindowsAzure.Storage.Blob;

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
                prompt = $"{GetCopyType(options.Category, options.Style)} a következő témával kapcsolatban: {options.Subject}.";
            } else
            {
                prompt = $"Write a {options.Style} {options.Category} for the following subject: '{options.Subject}'";
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

        private string GetCopyStyle(string style)
        {
            if (style == "casual")
            {
                return "közvetlen";
            }
            if (style == "formal")
            {
                return "hivatalos";
            }
            if (style == "funny")
            {
                return "vicces";
            }
            if (style == "exacting")
            {
                return "igényes";
            }
            if (style == "stimulating")
            {
                return "ösztönző";
            }
            if (style == "romantic")
            {
                return "romantikus";
            }
            if (style == "melancholic")
            {
                return "melankolikus";
            }
            if (style == "outraged")
            {
                return "dühös";
            }
            if (style == "mysterious")
            {
                return "titokzatos";
            }
            if (style == "neutral")
            {
                return "általános";
            }
            return "általános";
        }

        private string GetCopyType(string type, string style)
        {
            string begin = $"Írj egy {GetCopyStyle(style)} ";
            string val = string.Empty;
            if (type == "socialMediaPost")
            {
                val = "közösségi média posztot";
            }
            if (type == "socialMediaBio")
            {
                val = "közösségi média bio-t";
            }
            if (type == "socialMediaAd")
            {
                val = "közösségi média reklámot";
            }
            if (type == "blogPost")
            {
                val = "blog posztot";
            }
            if (type == "article")
            {
                val = "cikket";
            }
            if (type == "essay")
            {
                val = "esszét";
            }
            if (type == "emailBody")
            {
                val = "email szöveget";
            }
            if (type == "emailTitle")
            {
                val = "email tárgyat";
            }
            if (type == "message")
            {
                val = "üzenetet";
            }
            if (type == "introduction")
            {
                val = "bemutatkozást";
            }
            return begin + val;
        }
    }
}

