import React from 'react';
import './TextField.css';

export default function TextField(props) {
    return (
        <div className="text-field">
            <label className="text-field-label">{props.title}</label>
            {props.description === null ? "" : <p className="text-field-description">{props.description}</p>}
            <div className="text-field-container" id={props.error ? "text-field-container-error" : ""}>
                <div className="text-field-icon" id="prefixIcon">
                    {props.prefixIcon}
                </div>
                <input placeholder={props.hint} className="text-field-input" type={props.password === true ? "password" : "text"} value={props.value} onChange={props.onChange} />
                <div className="text-field-icon" id="suffixIcon">
                    {props.suffixIcon}
                </div>
            </div>
        </div>
    )
}