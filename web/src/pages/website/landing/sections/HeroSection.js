import React from 'react'
import styles from './HeroSection.module.css'
import MailLottie from '../../../../assets/lotties/mail_lottie.json';
import { Player } from '@lottiefiles/react-lottie-player';

function HeroSection() {
    return (
        <div className={`${styles.container}`}>
            <div className={`${styles.side} ${styles.sideLeft}`}>
                <h2>
                    Introducing the ultimate solution for Outlook Mail
                </h2>
                <h5>
                    Let us write your emails for you, so you can focus on what you do best - work that matters
                </h5>
            </div>
            <div className={`${styles.side} ${styles.sideRight}`}>
                <Player
                    className={styles.lottie}
                    autoplay
                    loop
                    src={MailLottie}
                >
                </Player>
            </div>
        </div>
    );
}

export default HeroSection;