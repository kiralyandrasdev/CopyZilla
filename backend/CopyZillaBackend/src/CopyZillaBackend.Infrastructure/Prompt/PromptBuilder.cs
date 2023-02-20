using CopyZillaBackend.Application.Contracts.Prompt;
using CopyZillaBackend.Application.Features.Prompt.ProcessAdvancedPromptEvent;
using CopyZillaBackend.Application.Features.Prompt.ProcessQuickPromptEvent;

namespace CopyZillaBackend.Infrastructure.Prompt
{
    public class PromptBuilder : IPromptBuilder
    {
        public string Build(ProcessAdvancedPromptOptions options)
        {
            string languageCommand = string.Empty;

            if (options.Language == "hu")
            {
                languageCommand = " Magyarul válaszolj.";
            }

            return options.Prompt + languageCommand;
        }

        public string Build(ProcessQuickPromptOptions options)
        {
            if (options.Language == "hu")
            {
                return $"{GetCopyType(options.Category, options.Style)} a következő témával kapcsolatban: {options.Subject}.";
            }

            return $"Write a {options.Style} {options.Category} for the following subject: '{options.Subject}'. Answer in English.";
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
