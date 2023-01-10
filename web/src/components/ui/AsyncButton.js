import React from 'react';
import './AsyncButton.css';

function AsyncButton(props) {
    let id;

    if (props.hasOwnProperty("enabled") && !props.enabled) {
        id = "async-button-disabled";
    }

    const onClick = () => {
        if (!props.hasOwnProperty("enabled")) {
            props.onClick();
            return;
        }

        if (props.enabled) {
            props.onClick();
        }
    }

    return (
        <button className="async-button" id={id} onClick={onClick}>{props.title || "Button"}</button>
    );
}

export default AsyncButton;