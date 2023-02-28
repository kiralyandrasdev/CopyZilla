/*global chrome*/

import { useContext, useEffect, useState } from 'react';
import './App.css'
import ReplyMoodSelector from './features/reply/components/mood/ReplyToneSelector'
import ReplyTypeSelector from './features/reply/components/response_type/ReplyTypeSelector'
import ReplyButton from './features/reply/components/buttons/ReplyButton'
import getEmailText from './utils/emailUtils';
import { OptionsContext } from './context/optionsContext';
import InstructionsButton from './features/reply/components/buttons/InstructionsButton';
import InstructionsPopup from './features/reply/components/popups/InstructionsPopup';

export enum PopupMode {
  Allow,
  Disallow,
}

export enum MailClient {
  Gmail,
  Outlook,
}

type AppProps = {
  popupMode: PopupMode;
  mailClient: MailClient;
}

export default function App(props: AppProps) {
  const [isWriting, setIsWriting] = useState(false);
  const [instructionsOpen, setInstructionsOpen] = useState(false);
  const { options, popupMode, setPopupMode, setMailClient } = useContext(OptionsContext);

  useEffect(() => {
    setPopupMode(props.popupMode);
    setMailClient(props.mailClient);
  }, []);

  const handleWrite = () => {
    setIsWriting(true);

    const optionsDto = {
      email: getEmailText(),
      objective: options.objective.value,
      tone: options.tone.value,
      instructions: options.instructions,
    };

    chrome.runtime.sendMessage({
      type: 'to_background_WRITE_REPLY',
      data: {
        options: optionsDto
      }
    }, (_) => {
      setIsWriting(false);
    });
  }

  const handleInstructionsOpen = () => {
    setInstructionsOpen(!instructionsOpen);
  }

  return (
    <div className="app">
      <div className="options">
        <div className="reply__tones">
          <ReplyMoodSelector />
          <ReplyTypeSelector />
        </div>
        <div className="reply__actions">
          <div className="instructionsPopup__parent">
            {instructionsOpen && popupMode === PopupMode.Allow &&
              <InstructionsPopup
                onClose={handleInstructionsOpen}
              />}
            <InstructionsButton
              onClick={handleInstructionsOpen}
            />
          </div>
          <ReplyButton
            isWriting={isWriting}
            onWrite={handleWrite}
          />
        </div>
      </div>
    </div>
  )
}