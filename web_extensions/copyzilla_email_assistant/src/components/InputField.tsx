import React, { FC } from 'react'
import styles from './InputField.module.css';

type InputFieldProps = {
    title?: string;
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    suffixIcon?: JSX.Element;
}

export default function InputField(props: InputFieldProps) {
    return (
        <div className={styles.inputField}>
            {props.title && <label>{props.title}</label>}
            <div className={styles.inputField__container}>
                <input
                    value={props.value}
                    onChange={(e) => props.onChange(e.target.value)}
                    placeholder={props.placeholder}
                />
                {props.suffixIcon && <div className={styles.inputField__icon}>{props.suffixIcon}</div>}
            </div>
        </div>
    );
}