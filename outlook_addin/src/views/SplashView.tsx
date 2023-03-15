import React from 'react'
import styles from './SplashView.module.css';
import LoadingIndicator from '../components/LoadingIndicator';

function SplashView() {
    return (
        <div className={styles.splash}>
            <LoadingIndicator 
                color="var(--grey5)"
            />
        </div>
    );
}

export default SplashView;