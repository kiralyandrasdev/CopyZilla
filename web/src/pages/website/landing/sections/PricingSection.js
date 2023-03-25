import React, { useContext, useEffect, useRef } from 'react'
import styles from './PricingSection.module.css'
import SectionTag from '../components/SectionTag';
import PricingCard from '../components/PricingCard';

function PricingSection() {
    const pricingCards = [
        {
            plan: "Individual",
            price: "$19",
            description: "For individuals and small teams that have fewer email writing tasks",
            features: [
                "200 email operations / day",
                "Email templates",
                "Rephrase text",
                "Automatic language detection"
            ],
            buttonTitle: "Try free for 30 days",
            buttonLink: "/auth/signup",
        },
        {
            plan: "Enterprise",
            price: "$36",
            description: "For large teams and businesses that have a lot of email writing tasks",
            features: [
                "Unlimited usage",
                "Email templates",
                "Rephrase text",
                "Automatic language detection"
            ],
            buttonTitle: "Get in touch",
            buttonLink: "/contact",
            isPopular: false,
            isCustom: true,
        },
    ];

    return (
        <div id="pricing" className={`${styles.container} section`}>
            <SectionTag
                name="PRICING"
            />
            <h2>
                Plans that start free and fit to your needs
            </h2>
            <h6>
                With our simple plans, supercharge your email writing to boost your productivity.
            </h6>
            <div className={styles.pricingCards}>
                {pricingCards.map((pricingCard, index) => (
                    <PricingCard
                        plan={pricingCard.plan}
                        price={pricingCard.price}
                        description={pricingCard.description}
                        features={pricingCard.features}
                        buttonTitle={pricingCard.buttonTitle}
                        buttonLink={pricingCard.buttonLink}
                        isPopular={pricingCard.isPopular}
                        key={index}
                        isFree={pricingCard.isFree}
                        isCustom={pricingCard.isCustom}
                    />
                ))}
            </div>
        </div>
    );
}

export default PricingSection;