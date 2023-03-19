import React from 'react'
import styles from './PricingSection.module.css'
import SectionTag from '../components/SectionTag';
import PricingCard2 from '../components/PricingCard2';

function PricingSection() {
    const pricingCards = [
        {
            plan: "Personal",
            price: "$0",
            description: "Write 10 email messages per day with the help of CopyZilla Email Assistant",
            features: [
                "10 email operations / day",
                "Email templates",
                "Rephrase text",
                "Automatic language detection"
            ],
            buttonTitle: "Start Writing for Free",
            buttonLink: "/",
            isPopular: false,
            isFree: true,
        },
        {
            plan: "Pro",
            price: "$19",
            description: "Write 100 email messages per day with the help of CopyZilla Email Assistant",
            features: [
                "100 email operations / day",
                "Email templates",
                "Rephrase text",
                "Automatic language detection"
            ],
            buttonTitle: "Get Started",
            buttonLink: "/",
            isPopular: true,
        },
        {
            plan: "Business",
            price: "$36",
            description: "Write 300 email messages per day with the help of CopyZilla Email Assistant",
            features: [
                "300 email operations / day",
                "Email templates",
                "Rephrase text",
                "Automatic language detection"
            ],
            buttonTitle: "Get Started",
            buttonLink: "/",
            isPopular: false,
        },
    ];

    return (
        <div className={`${styles.container} section`}>
            <SectionTag
                name="PRICING"
            />
            <h2>
                Plans that start free and fit to your needs
            </h2>
            <h6>
                With our simple plans, supercharge your content writing to helps your business. Let’s make great content together
            </h6>
            <div className={styles.pricingCards}>
                {pricingCards.map((pricingCard, index) => (
                    <PricingCard2
                        plan={pricingCard.plan}
                        price={pricingCard.price}
                        description={pricingCard.description}
                        features={pricingCard.features}
                        buttonTitle={pricingCard.buttonTitle}
                        buttonLink={pricingCard.buttonLink}
                        isPopular={pricingCard.isPopular}
                        key={index}
                        isFree={pricingCard.isFree}
                    />
                ))}
            </div>
        </div>
    );
}

export default PricingSection;