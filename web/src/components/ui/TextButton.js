import React from 'react';
import './TextButton.css';

export default function TextButton(props) {
    function style() {
        return { 'color': props.color || 'white', "textDecoration": props.underline ? "underline" : "none" };
    }

    function iconStyle() {
        return { 'color': props.color || 'white', "marginTop": "2.5px", "color": "var(--grey2)" };
    }

    let className = "textButton";

    if (props.className) {
        className += ` ${props.className}`;
    }

    return (
        <div className={className} onClick={props.onClick} id={props.id}>
            {props.prefixIcon && <span className="textButton__prefixIcon" style={iconStyle()}>{props.prefixIcon}</span>}
            <p style={style()}>{props.title || "Button"}</p>
        </div>
    );
}