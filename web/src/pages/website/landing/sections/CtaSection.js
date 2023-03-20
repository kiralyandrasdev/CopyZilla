import React from 'react'
import styles from './CtaSection.module.css'
import SquareScreenshot from '../../../../assets/square-screenshot.png';
import { BsCheckCircleFill } from 'react-icons/bs';

function CtaSection() {
    return (
        <div className={styles.sectionContainer}>
            <div className={styles.container}>
                <div className={`${styles.side} ${styles.sideLeft}`}>
                    <h5>
                        BOOST YOUR EMAIL WRITING PRODUCTIVITY
                    </h5>
                    <h2>
                        End writer's block today
                    </h2>
                    <p>
                        It’s like having access to a team of email experts writing powerful emails for you in 1-click.
                    </p>
                    <div className={styles.benefitRow}>
                        <div className={styles.benefit}>
                            <BsCheckCircleFill size={18} color="var(--blue)" />
                            <h6>No credit card required</h6>
                        </div>
                        <div className={styles.benefit}>
                            <BsCheckCircleFill size={18} color="var(--blue)" />
                            <h6>Cancel anytime</h6>
                        </div>
                    </div>
                    <div className={styles.button}>
                        <h6>Get started for free</h6>
                    </div>
                </div>
                <div className={`${styles.side} ${styles.sideRight}`}>
                    <div className={styles.imageContainer}>
                        <img src={SquareScreenshot} alt="email" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CtaSection;