import React from 'react'
import styles from './FeatureCard.module.css'

function FeatureCard({
    title,
    description,
    icon,
}) {
    return (
        <div className={styles.container}>
                <div className={styles.icon}>
                    {icon}
                </div>
            <h4>{title}</h4>
            <p>{description}</p>
        </div>
    );
}

export default FeatureCard;