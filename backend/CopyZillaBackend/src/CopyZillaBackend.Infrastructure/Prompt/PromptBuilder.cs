using CopyZillaBackend.Application.Contracts.Prompt;
using CopyZillaBackend.Application.Features.Prompt.ProcessAdvancedPromptEvent;
using CopyZillaBackend.Application.Features.Prompt.ProcessEmailPromptEvent;
using CopyZillaBackend.Application.Features.Prompt.ProcessQuickPromptEvent;
using CopyZillaBackend.Application.Features.Prompt.ProcessRephrasePromptEvent;

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
            if (string.IsNullOrEmpty(options.Email))
            {
                return $"I must craft an email and I need immediate help." +
                    $" You must compose a polite email that contains the following: '{options.Instructions}'." +
                    $" You must write the email in the language this was written in." +
                    $" I don't need the subject of the email." +
                    $" You must make sure the tone of the email is {options.Tone}." +
                    $" You must make sure the email is short and precise." +
                    $" You must start the email with a greetings and close the email with a goodbye.";
            }

            string replyPrompt = $"I received an email and I need immediate help crafting a polite response." +
                $" You must make sure the response email gives a feeling that I am saying {options.Objective}." +
                $" The contents of the email that I received are: '{options.Email}'.";

            if (!string.IsNullOrEmpty(options.Tone))
            {
                replyPrompt += $" You must make sure the tone of the response email is {options.Tone}.";
            }

            if (!string.IsNullOrEmpty(options.Instructions))
            {
                replyPrompt += $" The response email must contain the following: '{options.Instructions}'.";
            }

            replyPrompt += " You must make sure the response email is short and precise." +
                " You must not repeat texts that was written in the received email." +
                " You must start the email with a greetings and close the email with a goodbye." +
                " You must answer in the same language the email was written in.";

            return replyPrompt;
        }

        public string Build(ProcessRephrasePromptEventOptions options)
        {
            if (options.Objective == "reword")
            {
                return $"Rephrase the following text: '{options.Text}'.";
            }

            return $"Rephrase the following text: '{options.Text}' so it is {options.Objective}.";
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
