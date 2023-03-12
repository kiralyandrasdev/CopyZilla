import { createRoot } from 'react-dom/client';
import './main.css'
import { initializeApp } from '@firebase/app';
import { getFirebaseConfig } from '../../src/config/firebaseConfig';
import OptionsContextProvider from './context/optionsContext';
import { getMailClient, getPopupMode } from './utils/optionsUtils';
import { MailClient } from './enum/mailClient';
import App from './App';
import { ComposeType } from './enum/composeType';
import { PopupMode } from './enum/popupMode';
import { ClientConfigList } from './config/clientConfig';

async function initializeFirebase() {
  const firebaseConfig = await getFirebaseConfig();
  initializeApp(firebaseConfig!);
}

initializeFirebase();

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'to_content_WRITE_EMAIL') {
    const client = getMailClient();

    const messageEntryClass = ClientConfigList.get(client)!.messageEntryClass;

    const messageBodyElement = document.querySelector(messageEntryClass);
    const replyLines = request.data.reply.split('\n');

    // Remove all children
    while (messageBodyElement?.firstChild) {
      messageBodyElement.removeChild(messageBodyElement.firstChild);
    }

    console.log('replyLines', replyLines);

    replyLines.forEach((line: string, lineIndex: number) => {
      const lineElement = document.createElement('div');
      lineElement.id = `reply-line-${lineIndex}`;

      messageBodyElement?.appendChild(lineElement);

      const lineElementReQuery = document.getElementById(`reply-line-${lineIndex}`);

      if (!lineElementReQuery) {
        return;
      }

      const chars = line.split('');

      // Append a new blank line if we're not on the last line and chars is empty
      if (chars.length === 0 && lineIndex !== replyLines.length - 1) {
        lineElementReQuery.appendChild(document.createElement('br'));
      }

      chars.forEach((char, charIndex) => {
        setTimeout(() => {
          lineElementReQuery.textContent += char;
        }, 15 * charIndex);
      });
    });

    sendResponse({ type: 'to_background_WRITE_REPLY_SUCCESS' });
  }

  return true;
});

function insertApp() {
  const appId = 'replyRoot'

  const existingContainer = document.getElementById(appId);
  if (existingContainer != null) {
    return;
  }

  const mailClient = getMailClient();

  const appEntryClass = ClientConfigList.get(mailClient)!.appEntryClass;

  const appParent = document.querySelector(appEntryClass);
  if (!appParent) {
    return;
  }

  const app = document.createElement('div')
  app.id = appId;

  let popupMode = getPopupMode(appParent);

  appParent.insertBefore(app, appParent.firstChild);

  const root = createRoot(app!);

  let composeType = ComposeType.Reply;

  if (mailClient === MailClient.Gmail && popupMode === PopupMode.Disallow) {
    composeType = ComposeType.New;
  }

  const previousEmailEntryClass = ClientConfigList.get(MailClient.Outlook)?.previousEmailEntryClass;
  const messageBodyElement = document.querySelectorAll(previousEmailEntryClass!);

  if(messageBodyElement.length < 1 && mailClient === MailClient.Outlook) {
    composeType = ComposeType.New;
  }

  root.render(
    <OptionsContextProvider>
      <App
        composeType={composeType}
        popupMode={popupMode}
        mailClient={mailClient}
      />
    </OptionsContextProvider>
  )
}

window.addEventListener("load", () => {
  insertApp();
});

const target = document.body;
const config = { childList: true, subtree: true };

const observer = new MutationObserver((mutations) => {
  observer.disconnect();

  setTimeout(() => {
    insertApp();

    observer.observe(target, config);
  }, 1000);
});

observer.observe(target, config);