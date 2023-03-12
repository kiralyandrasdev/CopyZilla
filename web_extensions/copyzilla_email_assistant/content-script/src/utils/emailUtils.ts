import { ClientConfigList } from "../config/clientConfig";
import { MailClient } from "../enum/mailClient";
import gmail_parseEmail from "./gmailUtils";
import { getMailClient } from "./optionsUtils";
import outlook_parseEmail from "./outlookUtils";

export default function parseEmail(): string {
    const mailClient = getMailClient();
    switch (mailClient) {
        case MailClient.Gmail:
            return gmail_parseEmail();
        case MailClient.Outlook:
            return outlook_parseEmail();
        default:
            return "";
    }
}

export function parseTextBox(): string {
    const client = getMailClient();

    const messageEntryClass = ClientConfigList.get(client)!.messageEntryClass;

    const messageBodyElement = document.querySelector(messageEntryClass);

    // Loop through all the child nodes of the message body element and get the text
    let text = "";

    if (messageBodyElement) {
        for (let i = 0; i < messageBodyElement.childNodes.length; i++) {
            const childNode = messageBodyElement.childNodes[i];

            // If the child node has a textContent property, add it to the text
            if (childNode.textContent) {
                text += childNode.textContent;
            }

            // If not last line of text, add a new line
            if (i !== messageBodyElement.childNodes.length - 1) {
                text += "\n";
            }
        }
    }

    return text;
}