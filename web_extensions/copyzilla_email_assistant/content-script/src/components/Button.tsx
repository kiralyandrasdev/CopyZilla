import React from 'react'
import styles from './Button.module.css';

export interface ButtonProp {
    title: string;
    onClick: () => void;
}

function Button(props: ButtonProp): JSX.Element {
    return (  
        <div className={styles.button} onClick={() => props.onClick()}>
            <div className={styles.button__title}>{props.title}</div>
        </div>
    );
}

export default Button;