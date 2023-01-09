import React from 'react';
import './TextButton.css';

export default function TextButton(props) {
    function style() {
        if (props.hasOwnProperty("id")) {
            return {};
        }

        return { 'color': props.color || 'black' };
    }

    return (
        <div className="text-button" onClick={props.onClick} id={props.id}>
            {props.prefixIcon && <span className="text-button-prefix-icon" style={style()}>{props.prefixIcon}</span>}
            <p style={style()}>{props.title || "Button"}</p>
        </div>
    );
}