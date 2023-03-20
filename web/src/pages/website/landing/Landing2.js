import React, { useRef } from 'react'
import styles from './Landing2.module.css'
import HeroSection from './sections/HeroSection';
import DownloadSection from './sections/DownloadSection';
import DemoSection from './sections/DemoSection';
import FeaturesSection from './sections/FeaturesSection';
import PricingSection from './sections/PricingSection';
import FaqSection from './sections/FaqSection';
import CtaSection from './sections/CtaSection';

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
            <div className={styles.whiteSection}>
                <PricingSection ref={pricingRef} />
                <FaqSection />
            </div>
            <CtaSection />
        </div>
    );
}

export default Landing2;