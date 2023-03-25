import React from 'react'
import styles from './DownloadButton.module.css'
import OutlookPng from '../../../../assets/outlook.png';
import { useNavigate } from 'react-router-dom';

function DownloadButton({color}) {
    let style = {
        backgroundColor: color
    }

    const navigate = useNavigate();

    const handleInstall = () => {
        navigate('/install');
    }

    return (
        <div className={styles.container} style={style} onClick={() => handleInstall()}>
            <img src={OutlookPng} alt="Outlook" />
            <h6>Install for Outlook</h6>
        </div>
    );
}

export default DownloadButton;