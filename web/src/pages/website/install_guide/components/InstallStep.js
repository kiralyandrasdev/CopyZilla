import React from 'react'
import styles from './InstallStep.module.css'

function InstallStep({
    order,
    title,
    imageSource,
    description,
}) {
    console.log(title);

    return (
        <div className={`${styles.container}`}>
            <div className={styles.heading}>
                <h5>
                    Step {order}
                </h5>
                <h6>
                    {title}
                </h6>
            </div>
            <img src={imageSource} alt="Outlook" />
            <p>
                {description}
            </p>
        </div>
    );
}

export default InstallStep;