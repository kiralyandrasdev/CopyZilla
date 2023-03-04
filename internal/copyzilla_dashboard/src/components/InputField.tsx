import React from 'react'
import styles from './InputField.module.css';

type InputFieldProps = {
    label?: string;
    value: string;
    onChange: (value: string) => void;
    hint?: string;
    error?: boolean;
    disabled?: boolean;
    obscure?: boolean;
}

function InputField(props: InputFieldProps) {
    let containerClass = styles.inputContainer;

    if (props.error) {
        containerClass = `${styles.inputContainer} ${styles.error}`;
    }

    return (
        <div className={styles.container}>
            {props.label && <label>{props.label}</label>}
            <div className={containerClass}>
                <input
                    type={props.obscure ? "password" : "text"}
                    value={props.value}
                    onChange={(e) => props.onChange(e.target.value)}
                    disabled={props.disabled}
                    placeholder={props.hint}
                />
            </div>
        </div>
    );
}

export default InputField;