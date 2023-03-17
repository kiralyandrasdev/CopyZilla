﻿using CopyZillaBackend.Application.Contracts.Prompt;
using CopyZillaBackend.Application.Features.Prompt.ProcessEmailPromptEvent;
using CopyZillaBackend.Application.Features.Prompt.ProcessRephrasePromptEvent;

namespace CopyZillaBackend.Infrastructure.Prompt
{
    public class PromptBuilder : IPromptBuilder
    {
        public string Build(ProcessEmailPromptEventOptions options)
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
    }
}
