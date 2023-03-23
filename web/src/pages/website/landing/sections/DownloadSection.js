import React from 'react'
import styles from './DownloadSection.module.css'
import '../Section.css';
import DownloadButton from '../components/DownloadButton';

function DownloadSection() {
    return (
        <div className={`${styles.container}`}>
            <DownloadButton />
            <p>
                Supported on Windows and macOS
            </p>
        </div>
    );
}

export default DownloadSection;