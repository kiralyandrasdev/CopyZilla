import React from 'react'
import styles from './PricingCard2.module.css'
import { FiCheck } from 'react-icons/fi';

function PricingCard2({
    plan,
    price,
    description,
    features,
    buttonTitle,
    buttonLink,
    isPopular,
    isFree,
    isCustom,
}) {
    let cardStyle = styles.container;
    if (isPopular) {
        cardStyle = `${styles.container} ${styles.popular}`;
    }

    let buttonStyle = styles.button;
    if (isFree) {
        buttonStyle = `${styles.button} ${styles.free}`;
    }

    return (
        <div className={`${cardStyle} dropshadow`}>
            {isPopular && (
                <div className={styles.popularTag}>
                    <p>Most Popular</p>
                </div>
            )}
            <div className={styles.plan}>
                <h5>{plan}</h5>
                {
                    isCustom ? (
                        <div className={styles.price}>
                            <h3>Contact us</h3>
                        </div>
                    ) :
                        (
                            <div className={styles.price}>
                                <h1>{price}</h1>
                                <p> /month</p>
                            </div>
                        )
                }
                <p>{description}</p>
            </div>
            <div className={buttonStyle}>
                <h6>{buttonTitle}</h6>
            </div>
            <h6>
                What’s included?
            </h6>
            <div className={styles.features}>
                {features.map((feature, index) => (
                    <div className={styles.feature} key={index}>
                        <div className={styles.featureItem}>
                            <FiCheck
                                size={18}
                                color="var(--grey2)"
                            />
                            <p>{feature}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default PricingCard2;