using CopyZillaBackend.Application.Contracts.Prompt;
using CopyZillaBackend.Application.Features.Prompt.ProcessAdvancedPromptEvent;
using CopyZillaBackend.Application.Features.Prompt.ProcessEmailPromptEvent;
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

        public string Build(ProcessEmailPromptOptions options)
        {
            string prompt = $"{GetObjective(options.Objective)} to the following email from {options.Recipient}: '{options.CurrentEmail}', signed by {options.Sender}.";

            if (!string.IsNullOrEmpty(options.Mood))
            {
                prompt += $" Make sure the mood of the email is {options.Mood}.";
            }

            if (!string.IsNullOrEmpty(options.Length))
            {
                prompt += $" Make sure the email is {options.Length}.";
            }

            if (!string.IsNullOrEmpty(options.Instructions))
            {
                prompt += $" Make sure the email contains the following: {options.Instructions}";
            }

            if (!string.IsNullOrEmpty(options.PreviousEmail))
            {
                prompt += $" This is the previous email for reference: {options.PreviousEmail}";
            }

            prompt += " Answer in the same language the email was written in.";

            return prompt;
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

        private string GetObjective(string objective)
        {
            if (objective == "neutral")
            {
                return "Answer neutral";
            }

            return "Write an email by saying " + objective;
        }
    }
}
