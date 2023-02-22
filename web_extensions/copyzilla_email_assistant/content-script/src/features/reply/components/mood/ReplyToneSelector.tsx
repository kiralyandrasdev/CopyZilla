import React, { useContext, useState } from 'react'
import ReplyTone, { ReplyToneModel, ReplyToneProp } from './ReplyTone';
import '../ReplyOptionList.css';
import { OptionsContext } from '../../../../context/optionsContext';
import { AvailableTones as AvailableTones } from '../../config/replyConfig';

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