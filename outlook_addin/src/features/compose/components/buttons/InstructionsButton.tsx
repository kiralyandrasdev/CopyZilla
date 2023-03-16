import React from 'react'
import '../ReplyOption.css';

type InstructionsButtonProps = {
    onClick: () => void;
}

function InstructionsButton(props: InstructionsButtonProps): JSX.Element {
    const handleClick = () => {
        props.onClick();
    }

    return (
        <div className="reply__option__container" onClick={() => handleClick()}>
            <div className="reply__option__container__title">Instructions 🗒</div>
        </div>
    );
}

export default InstructionsButton;