/*global chrome*/

import { useContext, useEffect, useState } from 'react';
import './App.css'
import ReplyMoodSelector from './features/reply/components/mood/ReplyToneSelector'
import ReplyTypeSelector from './features/reply/components/response_type/ReplyTypeSelector'
import ReplyButton from './features/reply/components/buttons/ReplyButton'
import { OptionsContext } from './context/optionsContext';
import InstructionsButton from './features/reply/components/buttons/InstructionsButton';
import InstructionsPopup from './features/reply/components/popups/InstructionsPopup';
import { PopupMode } from './enum/popupMode';
import { MailClient } from './enum/mailClient';
import Instructions from './features/reply/components/instructions/Instructions';
import { ComposeType } from './enum/composeType';
import parseEmail from './utils/emailUtils';
import TemplatesPopup from './features/reply/components/popups/TemplatesPopup';
import TemplatesButton from './features/reply/components/buttons/TemplatesButton';
import Templates from './features/reply/components/templates/Templates';
import Rephrase from './features/reply/components/rephrase/Rephrase';

type AppProps = {
  popupMode: PopupMode;
  mailClient: MailClient;
  composeType: ComposeType;
}

export default function App(props: AppProps) {
  const [isWriting, setIsWriting] = useState(false);
  const [instructionsOpen, setInstructionsOpen] = useState(false);
  const [templatesOpen, setTemplatesOpen] = useState(false);

  const [rephraseOpen, setRephraseOpen] = useState(false);
  const [selection, setSelection] = useState('');

  const { options, popupMode, setPopupMode, setMailClient, composeType, setComposeType } = useContext(OptionsContext);

  useEffect(() => {
    setPopupMode(props.popupMode);
    setMailClient(props.mailClient);
    setComposeType(props.composeType);

    // Listen for text selection on page with window.getSelection()
    window.addEventListener('mouseup', async () => {
      const selection = window.getSelection();

      // If text is selected, open popup
      if (selection && selection.toString().trim().length > 0) {
        // Close popup if it's already open
        if (rephraseOpen) {
          setRephraseOpen(false);

          // Wait for popup to close before opening it again
          await new Promise(r => setTimeout(r, 100));
        }

        setRephraseOpen(true);
        setSelection(selection.toString());
      }
    });
  }, []);

  const handleWrite = () => {
    setIsWriting(true);

    let email: string | null = '';

    if (composeType === ComposeType.Reply) {
      email = parseEmail();
    }

    const objective = composeType === ComposeType.New ? null : options.objective.value;

    const optionsDto = {
      email: email,
      objective: objective,
      tone: options.tone.value,
      instructions: options.instructions,
    };

    chrome.runtime.sendMessage({
      type: 'to_background_WRITE_EMAIL',
      composeType: composeType.toString(),
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
        <ReplyMoodSelector />
        {
          composeType == ComposeType.Reply && <ReplyTypeSelector />
        }
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
        <div className="templatesPopup__parent">
          {templatesOpen && popupMode === PopupMode.Allow &&
            <TemplatesPopup
              onClose={() => setTemplatesOpen(!templatesOpen)}
            />
          }
          <TemplatesButton
            onClick={() => setTemplatesOpen(!templatesOpen)}
          />
        </div>
      </div>
      {templatesOpen && popupMode === PopupMode.Disallow &&
        <Templates
          onClose={() => setTemplatesOpen(!templatesOpen)}
        />
      }
      {instructionsOpen && popupMode === PopupMode.Disallow &&
        <Instructions
          onClose={handleInstructionsOpen}
        />
      }
      <div className="rephrasePopup__parent">
        {
          rephraseOpen &&
          <Rephrase
            selection={selection}
            onClose={() => setRephraseOpen(!rephraseOpen)}
          />
        }
      </div>
    </div>
  )
}