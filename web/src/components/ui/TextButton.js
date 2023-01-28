import React from 'react';
import './TextButton.css';

export default function TextButton(props) {
    function style() {
        return { 'color': props.color || 'white', "textDecoration": props.underline ? "underline" : "none" };
    }

    let className = "textButton";

    if (props.className) {
        className += ` ${props.className}`;
    }

    return (
        <div className={className} onClick={props.onClick} id={props.id}>
            {props.prefixIcon && <span className="textButton__prefixIcon" style={style()}>{props.prefixIcon}</span>}
            <p style={style()}>{props.title || "Button"}</p>
        </div>
    );
}