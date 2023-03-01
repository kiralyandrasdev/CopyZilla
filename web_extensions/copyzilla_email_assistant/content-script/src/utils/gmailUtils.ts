import { ClientConfigList } from "../config/clientConfig";
import { MailClient } from "../enum/mailClient";

export default function gmail_parseEmail() : string {
    const previousEmailEntryClass = ClientConfigList.get(MailClient.Gmail)?.previousEmailEntryClass;
    const messageBodyElement = document.querySelectorAll(previousEmailEntryClass!);
    let text = "";
    if (!messageBodyElement || messageBodyElement.length === 0) {
        text = getMsoNormalEmailText();
    } else {
        text = messageBodyElement[0].textContent ?? "";
    }
    return text.replace(/\n/g, " ");
}

function getMsoNormalEmailText() {
    const pList = document.querySelectorAll('p[class="MsoNormal"]');
    if (!pList || pList.length === 0) {
        return "";
    }
    let text = "";
    for (let i = 0; i < pList.length; i++) {
        text += pList[i].textContent;
    }
    return text;
}