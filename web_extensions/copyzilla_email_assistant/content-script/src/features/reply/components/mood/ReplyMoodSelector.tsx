import React, { useState } from 'react'
import ReplyMood, { ReplyMoodItem, ReplyMoodProp } from './ReplyMood';
import '../ReplyOptionList.css';

function ReplyMoodSelector() {
    const moods: ReplyMoodItem[] = [
        {
            title: 'Neutral 😊',
        },
        {
            title: 'Excited 😃',
        },
        {
            title: 'Angry 😡',
        },
        {
            title: 'Confused 😕',
        },
        {
            title: 'Stressed 😰',
        }
    ];

    const [currentMood, setCurrentMood] = useState(moods[0]);

    const moodComponents: React.FC = () => {
        return (
            <div className="reply__option__list">
                {moods.map(item => (
                    <ReplyMood
                        item={ { title: item.title }}
                        isSelected={item.title === currentMood.title}
                        onSelect={(item: ReplyMoodItem) => setCurrentMood(item)}
                    />
                ))}
            </div>
        );
    };

    return moodComponents({});
}

export default ReplyMoodSelector;