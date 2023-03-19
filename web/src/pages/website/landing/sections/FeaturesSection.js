import React from 'react'
import styles from './FeaturesSection.module.css'
import SectionTag from '../components/SectionTag';
import { FiClock, FiCpu, FiZoomIn } from 'react-icons/fi';
import FeatureCard from '../components/FeatureCard';

function FeaturesSection() {
    return (
        <div className={`${styles.container} section`}>
            <SectionTag
                name="HOW IT WORKS"
            />
            <h2>
                Powered by state-of-the-art AI technology
            </h2>
            <h6>
                CopyZilla Email Assistant is powered by GPT-3, a state-of-the-art language model developed by OpenAI. Our service leverages the power of machine learning and natural language processing to extract context from the email thread and create intelligent responses
            </h6>
            <div className={styles.cardGrid}>
                <FeatureCard
                    title="Time matters"
                    description="With our Outlook Add-in, you'll save time where it matters most - building relationships with clients, closing deals, and growing your business."
                    icon={<FiClock 
                        size={32}
                    />}
                />
                <FeatureCard
                    title="Context"
                    description="Our add-in uses advanced algorithms to analyze the context and tone of each email and creates a response that fits seamlessly with your brand's voice and style."
                    icon={<FiCpu 
                        size={32}
                    />}
                />
                <FeatureCard
                    title="Grammar"
                    description="No longer will you need to worry about typos, grammar mistakes, or sounding too informal."
                    icon={<FiZoomIn 
                        size={32}
                    />}
                />
                 <FeatureCard
                    title="Time matters"
                    description="With our Outlook Add-in, you'll save time where it matters most - building relationships with clients, closing deals, and growing your business."
                    icon={<FiClock 
                        size={32}
                    />}
                />
                <FeatureCard
                    title="Context"
                    description="Our add-in uses advanced algorithms to analyze the context and tone of each email and creates a response that fits seamlessly with your brand's voice and style."
                    icon={<FiCpu 
                        size={32}
                    />}
                />
                <FeatureCard
                    title="Grammar"
                    description="No longer will you need to worry about typos, grammar mistakes, or sounding too informal."
                    icon={<FiZoomIn 
                        size={32}
                    />}
                />
            </div>
        </div>
    );
}

export default FeaturesSection;