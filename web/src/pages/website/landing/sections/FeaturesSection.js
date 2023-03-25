import React from 'react'
import styles from './FeaturesSection.module.css'
import SectionTag from '../components/SectionTag';
import { FiCheckSquare, FiBox, FiShield, FiClock, FiCpu, FiZoomIn } from 'react-icons/fi';
import FeatureCard from '../components/FeatureCard';
import { RiStackLine } from 'react-icons/ri';

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
                CopyZilla is powered by GPT-3.5, a state-of-the-art language model developed by OpenAI. Our service leverages the power of machine learning and natural language processing to extract context from the email thread and create intelligent responses.
            </h6>
            <div className={styles.cardGrid}>
                <FeatureCard
                    title="Context"
                    description="CopyZilla uses advanced algorithms to analyze the context and tone of each email and creates a response that fits seamlessly with your brand's voice and style."
                    icon={<FiCpu
                        size={32}
                    />}
                />
                <FeatureCard
                    title="Grammar"
                    description="No longer will you need to worry about typos, grammar mistakes, or sounding too informal.
                    CopyZilla constructs grammatically correct phrases and sentences."
                    icon={<FiCheckSquare
                        size={32}
                    />}
                />
                <FeatureCard
                    title="Contained workflow"
                    description="CopyZilla integrates seamlessly with your Outlook client, so there's no need to switch between applications or waste time searching for the right words."
                    icon={<FiBox
                        size={32}
                    />}
                />
                <FeatureCard
                    title="Privacy"
                    description="Use CopyZilla as your personal content writer to assist you with your never-ending tasks. Rest assured that we do not retain any of your personal information, including emails."
                    icon={<FiShield
                        size={32}
                    />}
                />
                <FeatureCard
                    title="Email templates"
                    description="You have the ability to save email templates in your CopyZilla account, you can utilize them later in our add-in to enhance your workflow."
                    icon={<RiStackLine
                        size={32}
                    />}
                />
                <FeatureCard
                    title="Time matters"
                    description="With CopyZilla, you'll save time where it matters most - building relationships with clients, closing deals, and growing your business."
                    icon={<FiClock
                        size={32}
                    />}
                />
            </div>
        </div>
    );
}

export default FeaturesSection;