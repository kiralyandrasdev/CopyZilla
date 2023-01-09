import React from 'react';
import './TextButton.css';

export default function TextButton(props) {
    return (
        <div className="text-button" onClick={props.onClick}>
            {props.prefixIcon && <span className="text-button-prefix-icon">{props.prefixIcon}</span>}
            <p style={{ 'color': props.color || 'black' }}>{props.title || "Button"}</p>
        </div>
    );
}