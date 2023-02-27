import { createRoot } from 'react-dom/client';
import './main.css'
import App from './App'
import { initializeApp } from '@firebase/app';
import { getFirebaseConfig } from '../../src/config/firebaseConfig';
import OptionsContextProvider from './context/optionsContext';

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

const appId = 'replyRoot'

function appendEditor() {
  const existingContainer = document.getElementById(appId);
  if (existingContainer != null) {
    return;
  }

  const replyTdElement = document.querySelector('.GQ');
  if (!replyTdElement) {
    return;
  }

  const app = document.createElement('div')
  app.id = appId;

  replyTdElement.insertBefore(app, replyTdElement.firstChild);

  const root = createRoot(app!);

  root.render(
    <OptionsContextProvider>
      <App />
    </OptionsContextProvider>
  )
}

window.addEventListener("load", () => {
  appendEditor();
});

const target = document.body;
const config = { childList: true, subtree: true };

const observer = new MutationObserver((mutations) => {
  observer.disconnect();

  setTimeout(() => {
    appendEditor();

    observer.observe(target, config);
  }, 1000);
});

observer.observe(target, config);