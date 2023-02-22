/*global chrome*/

import { useContext, useState } from 'react';
import './App.css'
import ReplyMoodSelector from './features/reply/components/mood/ReplyMoodSelector'
import ReplyTypeSelector from './features/reply/components/response_type/ReplyTypeSelector'
import ReplyButton from './features/reply/components/buttons/ReplyButton'
import { AuthContext } from '../../src/context/authContext';
import getEmailText from './utils/emailUtils';

export default function App() {
  const [isWriting, setIsWriting] = useState(false);

  const handleWrite = () => {
    setIsWriting(true);

    chrome.runtime.sendMessage({
      type: 'to_background_WRITE_REPLY',
      data: {
        options: {
          email: getEmailText(),
        }
      }
    }, (response) => {
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
          {/*           <Button
            title="Fiók 📱"
            onClick={() => window.open("https://copyzilla.hu/user/account", "_blank")}
          /> */}
          <ReplyButton
            isWriting={isWriting}
            onWrite={handleWrite}
          />
        </div>
      </div>
    </div>
  )
}