import React, { useContext } from 'react'
import '../ReplyOption.css';

export interface WriteButtonProp {
    isWriting: boolean;
    onWrite: () => void;
}

function ReplyButton(props: WriteButtonProp): JSX.Element {
    let title = "Megfogalmaz ✍";
    let textStyle = {};

    if (props.isWriting) {
        title = "Íróink dolgoznak... ✍";
        textStyle = { "color": "var(--grey2)" }
    }

    const handleClick = () => {
        if (props.isWriting) {
            return;
        }

        props.onWrite();
    }

    return (
        <div className="reply__option__container reply__button" onClick={() => handleClick()}>
            <div className="reply__option__container__title" style={textStyle}>{title}</div>
        </div>
    );
}

export default ReplyButton;