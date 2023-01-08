import React from 'react';
import './AsyncButton.css';

function AsyncButton(props) {
    return (
        <button id="async-button" onClick={props.onClick}>{props.title || "Button"}</button>
    );
}

export default AsyncButton;