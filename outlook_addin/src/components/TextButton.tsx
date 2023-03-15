import React from 'react'
import styles from './TextButton.module.css'

export enum TextButtonSize {
    Small = "small",
    Default = "default",
}

type TextButtonProps = {
    text: string;
    onClick: () => void;
    color?: string;
    customColor?: string;
    fontSize?: TextButtonSize;
    prefixIcon?: JSX.Element;
    suffixIcon?: JSX.Element;
}

function TextButton(props: TextButtonProps) {
    let className = styles.button;

    if (props.fontSize === TextButtonSize.Small) {
        className = `${className} ${styles.buttonSmall}`;
    }

    if (props.color === 'green') {
        className = `${className} ${styles.green}`;
    }

    if (props.color === 'red') {
        className = `${className} ${styles.red}`;
    }

    if (props.color === 'white') {
        className = `${className} ${styles.white}`;
    }

    let style = {};

    if (props.customColor) {
        style = {
            color: props.customColor,
        }
    }

    return (
        <div className={className} onClick={props.onClick}>
            {props.prefixIcon && <div className={styles.prefixIcon} style={style}>{props.prefixIcon}</div>}
            <p style={style}>
                {props.text}
            </p>
            {props.suffixIcon && <div className={styles.suffixIcon} style={style}>{props.suffixIcon}</div>}
        </div>
    );
}

export default TextButton;