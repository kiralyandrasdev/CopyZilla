using CopyZillaBackend.Application.Contracts.Prompt;
using CopyZillaBackend.Application.Features.Prompt.ProcessEmailPromptEvent;
using CopyZillaBackend.Application.Features.Prompt.ProcessRephrasePromptEvent;

namespace CopyZillaBackend.Infrastructure.Prompt
{
    public class PromptBuilder : IPromptBuilder
    {
        public string BuildEmailPrompt(string language, ProcessEmailPromptEventOptions options)
        {
            if (string.IsNullOrEmpty(options.Email))
            {
                return "I must craft an email and I need immediate help." +
                    $" You must compose a polite email that contains the following: '{options.Instructions}'." +
                    " You must write the email in the language this was written in." +
                    " I don't need the subject of the email." +
                    $" You must make sure the tone of the email is {options.Tone}." +
                    " You must make sure the email is short and precise." +
                    " You must start the email with a greetings and close the email with a goodbye." + 
                    " You must make sure the email is well formatted.";
            }

            string replyPrompt = "I received an email and I need immediate help crafting a polite response." +
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
                " You must make sure the email is well formatted." +
                $" You must answer in {language}";

            return replyPrompt;
        }

        public string BuildRephrasePrompt(ProcessRephrasePromptEventOptions options)
        {
            string letterCase = options.Text.FirstOrDefault() == options.Text.FirstOrDefault().ToString().ToLower().FirstOrDefault()
                                       ? "lowercase" : "uppercase";

            string endingCharacter = options.Text.LastOrDefault().ToString();

            string punctuationMarkPrompt;
            switch (endingCharacter)
            {
                case ".":
                    punctuationMarkPrompt = " You must end the response with a period.";
                    break;
                case "?":
                    punctuationMarkPrompt = " You must end the response with a question mark.";
                    break;
                case "!":
                    punctuationMarkPrompt = " You must end the response with an exclamation mark.";
                    break;
                default:
                    punctuationMarkPrompt = " You must not end the response with a punctuation mark.";
                    break;
            }

            if (options.Objective == "reword")
            {
               return $"Rephrase the following text: '{options.Text}'." +
                      " I am not in need of an email template, so you must not start your answer with a greetings and must not end it with a goodbye." +
                      " You must not use apostrophes in the response." +
                      $" The response must start with {letterCase} character." +
                      $" {punctuationMarkPrompt}" +
                      $" You must answer in the same language the text was written in." +
                      " Return the reworded text only.";
            }

            return $"Rephrase the following text: '{options.Text}' so it is {options.Objective}." +
                " I am not in need of an email template, so you must not start your answer with a greetings and must not end it with a goodbye." +
                " You must not use apostrophes in the response." +
                $" The response must start with {letterCase} character." +
                $" {punctuationMarkPrompt}" +
                $" You must answer in the same language the text was written in." +
                " Return the reworded text only.";
        }

        public string BuildGetLanguagePrompt(string email)
        {
            return $"What language was the following text written in: '{email}'?" +
                   " Ignore the From, Sent, To, CC and Subject parts. " +
                   " Answer with one word by naming the language.";
        }
    }
}
