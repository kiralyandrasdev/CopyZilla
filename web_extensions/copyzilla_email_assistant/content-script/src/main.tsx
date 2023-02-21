import { createRoot } from 'react-dom/client';
import './main.css'
import App from './App'
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from './config/firebaseConfig';
import AuthWrapper from './AuthWrapper';
import AuthContextProvider from './context/authContext';

initializeApp(firebaseConfig);

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'WRITE_REPLY') {
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
            console.log("Sending response from content script.");
            sendResponse({ type: 'WRITE_REPLY_SUCCESS' });
          }
        }, 50 * index /*  + 50 * line.length * lineIndex */);
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
    <AuthContextProvider
      children={
        <AuthWrapper>
          <App />
        </AuthWrapper>
      }
    />
  )
}

window.addEventListener("load", () => {
  appendEditor();
});

const target = document.body;
const config = { childList: true, subtree: true };

const observer = new MutationObserver((mutations) => {
  console.log('mutation', mutations);
  observer.disconnect();

  setTimeout(() => {
    appendEditor();

    observer.observe(target, config);
  }, 1000);
});

observer.observe(target, config);