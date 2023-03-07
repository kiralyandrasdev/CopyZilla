import React from 'react'
import styles from './VersionView.module.css'
import './VersionViewAnimations.css'

function VersionView(props) {
    // Calculate based on props.date if version was already released
    const isReleased = props.date < Date.now();

    const formattedDate = props.date.toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
    });

    const printedDate = isReleased ? formattedDate : `ETA: ${formattedDate}`;

    return (
        <div className={`${styles.container} item--${props.position}`}>
            <div className={styles.currentVersionContainer}>
                {props.currentVersion &&
                    <div className={styles.currentVersion}>
                        <p>Current</p>
                    </div>
                }
            </div>
            <h5 className={styles.versionName}>{props.version}</h5>
            {props.updates &&
                <ul className={styles.updates}>
                    {props.updates.map((update, index) => {
                        return <li key={index}>{update}</li>
                    })}
                </ul>
            }
            <p className={styles.versionDate}>{printedDate}</p>
        </div>
    );
}

export default VersionView;