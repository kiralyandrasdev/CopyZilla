import React, { useRef } from 'react'
import styles from './Landing2.module.css'
import HeroSection from './sections/HeroSection';
import DownloadSection from './sections/DownloadSection';
import DemoSection from './sections/DemoSection';
import FeaturesSection from './sections/FeaturesSection';
import PricingSection from './sections/PricingSection';

function Landing2() {
    const pricingRef = useRef(null);

    const scrollToPricing = () => {
        pricingRef.current.scrollIntoView({ behavior: 'smooth' });
    }

    return (
        <div className={styles.container}>
            <HeroSection />
            <DownloadSection />
            <DemoSection />
            <FeaturesSection />
            <PricingSection ref={pricingRef}/>
        </div>
    );
}

export default Landing2;