import React, { useContext, useState } from 'react'
import ReplyTone, { ReplyToneModel, ReplyToneProp } from './ReplyTone';
import '../ReplyOptionList.css';
import { AvailableTones as AvailableTones } from '../../config/replyConfig';
import { OptionsContext } from '../../optionsContext';

function ReplyMoodSelector() {
    const { options, setTone } = useContext(OptionsContext);

    const moodComponents: React.FC = () => {
        return (
            <div className="reply__option__list">
                {AvailableTones.map(item => (
                    <ReplyTone
                        item={{ title: item.title, value: item.value }}
                        isSelected={item.title === options.tone.title}
                        onSelect={(item: ReplyToneModel) => setTone(item)}
                    />
                ))}
            </div>
        );
    };

    return moodComponents({});
}

export default ReplyMoodSelector;