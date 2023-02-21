import React from 'react'
import '../ReplyOption.css';

export interface ReplyTypeItem {
    title: string;
}

export interface ReplyTypeProp {
    item: ReplyTypeItem;
    isSelected?: boolean;
    onSelect: (item: ReplyTypeItem) => void;
}

function ReplyType(props: ReplyTypeProp): JSX.Element {
    let style = {};

    if(props.isSelected) {
        style = { "backgroundColor": "var(--green)" }
    }

    return (
        <div className="reply__option" style={style} onClick={() => props.onSelect(props.item)}>
            <div className="reply__option__title" >{props.item.title}</div>
        </div>
    );
}

export default ReplyType;