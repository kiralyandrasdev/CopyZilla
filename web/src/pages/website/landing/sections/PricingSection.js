import React, { useContext, useEffect, useRef } from 'react'
import styles from './PricingSection.module.css'
import SectionTag from '../components/SectionTag';
import PricingCard2 from '../components/PricingCard2';

function PricingSection() {
    const pricingCards = [
        {
            plan: "Individual",
            price: "$19",
            description: "Write 100 email messages per day with the help of CopyZilla Email Assistant",
            features: [
                "200 email operations / day",
                "Email templates",
                "Rephrase text",
                "Automatic language detection"
            ],
            buttonTitle: "Try free for 14 days",
            buttonLink: "/",
            //isPopular: true,
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
            buttonLink: "/",
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
                        isCustom={pricingCard.isCustom}
                    />
                ))}
            </div>
        </div>
    );
}

export default PricingSection;