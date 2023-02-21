import React, { useContext } from 'react'
import '../ReplyOption.css';
import { AuthContext } from '../../../../context/authContext';

export interface WriteButtonProp {
    isWriting: boolean;
    onWrite: () => void;
}

function ReplyButton(props: WriteButtonProp): JSX.Element {
    const { user } = useContext(AuthContext);

    let title = "Write ✍";
    let textStyle = {};

    if (props.isWriting) {
        title = "Writing... ✍";
        textStyle = { "color": "var(--grey2)" }
    }

    if(user === null) {
        textStyle = { "color": "var(--grey2)" }
    }

    const handleClick = () => {
        if (user === null) {
            return;
        }

        props.onWrite();
    }

    return (
        <div className="reply__option reply__button" onClick={() => handleClick()}>
            <div className="reply__option__title" style={textStyle}>{title}</div>
        </div>
    );
}

export default ReplyButton;