import React from 'react';
import './TextButton.css';

export default function TextButton(props) {
    function style() {
        if (props.hasOwnProperty("id")) {
            return {};
        }

        return { 'color': props.color || 'white' };
    }

    return (
        <div className="textButton" onClick={props.onClick} id={props.id}>
            {props.prefixIcon && <span className="textButton__prefixIcon" style={style()}>{props.prefixIcon}</span>}
            <p style={style()}>{props.title || "Button"}</p>
        </div>
    );
}