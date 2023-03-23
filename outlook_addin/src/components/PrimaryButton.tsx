import React from 'react'
import styles from './PrimaryButton.module.css';
import LoadingIndicator from './LoadingIndicator';

type PrimaryButtonProps = {
    title: string;
    isLoading: boolean;
    enabled?: boolean;
    onClick: () => void;
}

function PrimaryButton(props: PrimaryButtonProps) {
    const handleClick = () => {
        if (props.enabled === false || props.isLoading === true) {
            return;
        }

        props.onClick();
    }

    const buttonContent = () => {
        if (props.isLoading) {
            return <LoadingIndicator 
                color="var(--grey5)"
            />
        }

        return props.title;
    }

    return (
        <div className={styles.primaryButton}>
            <button onClick={() => handleClick()}>
                {buttonContent()}
            </button>
        </div>
    );
}

export default PrimaryButton;