import React, { useContext } from 'react'
import styles from './SnackBar.module.css'
import { AppContext } from '../context/appContext';

function SnackBar() {
    const { message, error } = useContext(AppContext);

    let containerClass = styles.container;

    if (error) {
        containerClass = `${styles.container} ${styles.containerError}`;
    }

    const getContent = () => {
        if (error) {
            return error;
        }

        if (message) {
            return message;
        }

        return "";
    }

    return (
        <div className={containerClass}>
            {getContent() && <p className={styles.text}>{getContent()}</p>}
        </div>
    );
}

export default SnackBar;