import React from 'react'
import styles from './SectionTag.module.css'

function SectionTag({name}) {
    return (
        <div className={styles.container}>
            <p>{name}</p>
        </div>
    );
}

export default SectionTag;