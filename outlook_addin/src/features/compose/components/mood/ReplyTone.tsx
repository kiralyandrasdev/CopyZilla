import React from 'react'
import '../ReplyOption.css';

export interface ReplyToneModel {
    title: string;
    value: string;
}

export interface ReplyToneProp {
    item: ReplyToneModel;
    isSelected?: boolean;
    onSelect: (item: ReplyToneModel) => void;
}

function ReplyTone(props: ReplyToneProp): JSX.Element {
    let style = {};

    if(props.isSelected) {
        style = { "backgroundColor": "var(--green)" }
    }

    return (
        <div className="reply__option__container" onClick={() => props.onSelect(props.item)} style={style}>
            <div className="reply__option__container__title">{props.item.title}</div>
        </div>
    );
}

export default ReplyTone;