import React from 'react'
import '../ReplyOption.css';

export interface ReplyMoodItem {
    title: string;
}

export interface ReplyMoodProp {
    item: ReplyMoodItem;
    isSelected?: boolean;
    onSelect: (item: ReplyMoodItem) => void;
}

function ReplyMood(props: ReplyMoodProp): JSX.Element {
    let style = {};

    if(props.isSelected) {
        style = { "backgroundColor": "var(--green)" }
    }

    return (
        <div className="reply__option" onClick={() => props.onSelect(props.item)} style={style}>
            <div className="reply__option__title">{props.item.title}</div>
        </div>
    );
}

export default ReplyMood;