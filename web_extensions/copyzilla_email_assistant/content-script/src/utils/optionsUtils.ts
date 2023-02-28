import { MailClient, PopupMode } from "../App";

export function getPopupMode(parent: Element) {
    if (getMailClient() === MailClient.Outlook) {
        return PopupMode.Disallow;
    }

    const firstChild = parent.firstElementChild;

    if (!firstChild) {
        return PopupMode.Allow;
    }

    const firstChildClassList = firstChild.classList;

    if (firstChildClassList.contains('GP')) {
        return PopupMode.Disallow;
    }

    return PopupMode.Allow;
}

export function getMailClient() {
    if (window.origin.includes('outlook')) {
        return MailClient.Outlook;
    }

    return MailClient.Gmail;
}