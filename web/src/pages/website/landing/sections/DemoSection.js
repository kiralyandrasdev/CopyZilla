import React from 'react'
import styles from './DemoSection.module.css'
import '../Section.css';
import SectionTag from '../components/SectionTag';
import AddinDemo from '../../../../assets/addin-demo.png';
import DownloadButton from '../components/DownloadButton';

function DemoSection() {
    return (
        <div className={`${styles.container} section`}>
            <SectionTag
                name="HOW TO"
            />
            <h2>
                Generate professional emails in seconds
            </h2>
            <h6>
                Our AI-powered add-in takes care of the hard work for you, delivering emails that are polished, professional, and convincing - just like a human would write them.
            </h6>
            <div className={styles.image}>
                <img src={AddinDemo} alt="" className='dropshadow' />
            </div>
            <DownloadButton
                color="var(--grey1)"
            />
        </div>
    );
}

export default DemoSection;