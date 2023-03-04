import React from 'react'
import styles from './TextButton.module.css';
import { DotLoader } from 'react-spinners';

type TextButtonProps = {
    text: string;
    onClick: () => void;
    isLoading?: boolean;
}

function TextButton(props: TextButtonProps) {
    const handleClick = () => {
        if (!props.isLoading) {
            props.onClick();
        }
    }

    return (
        <div className={styles.button} onClick={() => handleClick()}>
            {
                props.isLoading ?
                    <DotLoader
                        size={14}
                        color={"blue"}
                        loading={true}
                    /> :
                    props.text
            }
        </div>
    );
}

export default TextButton;