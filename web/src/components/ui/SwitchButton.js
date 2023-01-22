import React from 'react';
import './SwitchButton.css';

export default function SwitchButton(props) {
    let className = "switchButton";

    if (props.active) {
        className += " switchButton--active";
    }

    return (
        <div onClick={props.onClick} className={className}>
            {props.title || "Button"}
        </div>
    )
}