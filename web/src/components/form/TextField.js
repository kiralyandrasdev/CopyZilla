import React from 'react';
import './TextField.css';

export default function TextField(props) {
    let containerClass = "textField__container";

    if (props.error) {
        containerClass += " textField__container--error";
    }
    if (props.light) {
        containerClass += " textField__container--light";
    }

    return (
        <div className="textField">
            <label>{props.title}</label>
            {props.description && <p>{props.description}</p>}
            <div className={containerClass}>
                {
                    props.prefixIcon &&
                    <div className="textField__icon textField__icon__prefix">
                        {props.prefixIcon}
                    </div>
                }
                <input placeholder={props.hint} type={props.password === true ? "password" : "text"} value={props.value} onChange={props.onChange} />
                {
                    props.suffixIcon &&
                    <div className="textField__icon textField__icon__suffix">
                        {props.suffixIcon}
                    </div>
                }
            </div>
        </div>
    )
}