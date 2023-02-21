/*global chrome*/

import { useContext, useState } from 'react';
import './App.css'
import ReplyMoodSelector from './features/reply/components/mood/ReplyMoodSelector'
import ReplyTypeSelector from './features/reply/components/response_type/ReplyTypeSelector'
import ReplyButton from './features/reply/components/buttons/ReplyButton'
import Button from './components/Button';
import { AuthContext } from './context/authContext';

export default function App() {
  const [isWriting, setIsWriting] = useState(false);

  const { user } = useContext(AuthContext);

  const handleWrite = () => {
    setIsWriting(true);

    chrome.runtime.sendMessage({
      type: 'WRITE_REPLY',
      data: {
        reply: "Dear [Customer], \n\nThank you for your message. \n\nWe are sorry to hear that you are having issues with your [Product]. \n\nWe would like to help you with this. \n\nPlease send us a private message with your order number and we will be happy to assist you. \n\nKind regards, \n\n[Company]"
      }
    }, (response) => {
      console.log("Response from background script to component.");
      setIsWriting(false);
    });
  }

  return (
    <div className="app">
      <div className="options">
        <div className="reply__options">
          <ReplyMoodSelector />
          <ReplyTypeSelector />
        </div>
        <div className="reply__actions">
          <Button
            title="Profile 📱"
            onClick={() => console.log('clicked')}
          />
          <ReplyButton
            isWriting={isWriting}
            onWrite={handleWrite}
          />
        </div>
      </div>
      {
        user === null && <a href="https://copyzilla.hu/auth/login">Please log in to your account</a>
      }
    </div>
  )
}