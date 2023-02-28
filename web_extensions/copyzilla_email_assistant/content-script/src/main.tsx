import { createRoot } from 'react-dom/client';
import './main.css'
import App, { MailClient } from './App'
import { initializeApp } from '@firebase/app';
import { getFirebaseConfig } from '../../src/config/firebaseConfig';
import OptionsContextProvider from './context/optionsContext';
import { getMailClient, getPopupMode } from './utils/optionsUtils';

async function initializeFirebase() {
  const firebaseConfig = await getFirebaseConfig();
  initializeApp(firebaseConfig!);
}

initializeFirebase();

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'to_content_WRITE_REPLY') {
    const messageBodyElement = document.querySelector('.Am.Al.editable.LW-avf.tS-tW');
    const replyLines = request.data.reply.split('\n');

    replyLines.forEach((line: string, lineIndex: number) => {
      const lineElement = document.createElement('div');
      lineElement.id = `reply-line-${lineIndex}`;

      messageBodyElement?.appendChild(lineElement);

      const lineElementReQuery = document.getElementById(`reply-line-${lineIndex}`);

      if (!lineElementReQuery) {
        return;
      }

      const chars = line.split('');

      chars.forEach((char, index) => {
        setTimeout(() => {
          lineElementReQuery.textContent += char;
          if (index === chars.length - 1 && lineIndex === replyLines.length - 1) {
            sendResponse({ type: 'to_background_WRITE_REPLY_SUCCESS' });
          }
        }, 25 * index);
      });
    });
  }

  return true;
});

function insertApp() {
  const appId = 'replyRoot'

  const existingContainer = document.getElementById(appId);
  if (existingContainer != null) {
    return;
  }

  let mailClient = getMailClient();

  let targetClass = 'GQ';

  if (mailClient === MailClient.Outlook) {
    targetClass = '.yz4r1';
  }

  const appParent = document.querySelector(targetClass);
  if (!appParent) {
    console.log('No app parent found');
    return;
  }

  const app = document.createElement('div')
  app.id = appId;

  let popupMode = getPopupMode(appParent);

  appParent.insertBefore(app, appParent.firstChild);

  const root = createRoot(app!);

  root.render(
    <OptionsContextProvider>
      <App
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