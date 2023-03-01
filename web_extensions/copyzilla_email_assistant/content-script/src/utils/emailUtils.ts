import { MailClient } from "../enum/mailClient";
import gmail_parseEmail from "./gmailUtils";
import { getMailClient } from "./optionsUtils";
import outlook_parseEmail from "./outlookUtils";

export default function parseEmail() : string {
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