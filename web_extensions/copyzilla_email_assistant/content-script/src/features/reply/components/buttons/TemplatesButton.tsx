import React from 'react'
import '../ReplyOption.css';

type TemplatesButtonProps = {
    onClick: () => void;
}

function TemplatesButton(props: TemplatesButtonProps): JSX.Element {
    const handleClick = () => {
        props.onClick();
    }

    return (
        <div className="reply__option__container" onClick={() => handleClick()}>
            <div className="reply__option__container__title">Templates 📒</div>
        </div>
    );
}

export default TemplatesButton;