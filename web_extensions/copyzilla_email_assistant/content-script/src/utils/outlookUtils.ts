import { ClientConfigList } from "../config/clientConfig";
import { MailClient } from "../enum/mailClient";

export default function outlook_parseEmail() : string {
    const previousEmailEntryClass = ClientConfigList.get(MailClient.Outlook)?.previousEmailEntryClass;
    const messageBodyElement = document.querySelectorAll(previousEmailEntryClass!);
    const emailText = getTextFromDiv(messageBodyElement[0]);
    return emailText.replace(/\n/g, " ");
}

function getTextFromDiv(div: Element) {
    let text = '';
  
    // Loop over all child nodes of the div
    for (let node of div.childNodes) {
      // If the node is a text node, add its content to the text variable
      if (node.nodeType === Node.TEXT_NODE) {
        text += node.textContent?.trim();
      }
      // If the node is an element node, recursively call the function on it
      else if (node.nodeType === Node.ELEMENT_NODE) {
        text += getTextFromDiv(node as Element);
      }
    }
  
    return text;
  }