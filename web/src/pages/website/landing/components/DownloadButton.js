import React from 'react'
import styles from './DownloadButton.module.css'
import OutlookPng from '../../../../assets/outlook.png';

function DownloadButton({color}) {
    let style = {
        backgroundColor: color
    }

    return (
        <div className={styles.container} style={style}>
            <img src={OutlookPng} alt="Outlook" />
            <h6>Download for Outlook Desktop</h6>
        </div>
    );
}

export default DownloadButton;