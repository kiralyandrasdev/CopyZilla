import React from 'react';
import styles from './Contact.module.css';
import Message from '../../../assets/lotties/message.json';
import { Player } from '@lottiefiles/react-lottie-player';

function ContactPage() {
    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <div className={`${styles.lottie}`}>
                    <Player
                        className={styles.lottie}
                        autoplay
                        loop
                        src={Message}
                    >
                    </Player>
                </div>
                <div className={styles.text}>
                    <h4>Contact Us</h4>
                    <div className={styles.roundedContainer}>
                        <h6>
                            If you have any inquiries please feel free to contact us at <span style={{ textDecoration: "underline" }}>info@copyzilla.hu</span>
                        </h6>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ContactPage;