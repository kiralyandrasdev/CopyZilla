import React from "react";
import './TextArea.css';

export default function TextArea(props) {
    return (
        <div className="textarea">
            <label className="textarea-label" htmlFor="text-area">{props.title}</label>
            {props.description && <p className="textarea-description">{props.description}</p>}
            <textarea className="textarea-input" id={props.error ? "textarea-input-error" : ""} onChange={props.onChange} value={props.value} placeholder={props.hint || "Kezdj el gépelni..."} />
        </div>
    );
}