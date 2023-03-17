import React, { useContext, useState } from 'react'
import styles from './PricingCard.module.css'
import { AsyncButton } from '../../../../components';
import { FiCheck } from 'react-icons/fi';
import { CHECKOUT_MODE, createCheckoutSessionAsync } from '../../../../features/payment/actions/paymentActions';
import { AuthContext } from '../../../../features/authentication/authContext';
import { useSelector } from 'react-redux';

function PricingCard(props) {
    const [isLoading, setIsLoading] = useState(false);
    const { firebaseUid } = useContext(AuthContext);
    const { accessToken } = useSelector(state => state.auth);

    let className = `${styles.pricingCard} ${styles[`pricingCard__${props.order}`]} animation__fadeInUp`;

    if (props.dark) {
        className += ` ${styles.pricingCard__dark}`;
    }

    const handleCreateCheckoutSession = async () => {
        setIsLoading(true);
        const redirectUrl = await createCheckoutSessionAsync(CHECKOUT_MODE.SUBSCRIPTION, { firebaseUid: firebaseUid, priceId: props.priceId }, accessToken);
        setIsLoading(false);

        localStorage.setItem(`initialized_${firebaseUid}`, true);

        if (redirectUrl) {
            window.open(redirectUrl, '_blank', 'noopener,noreferrer');
        }
    }

    const handleSelect = () => {
        if (props.onClick) {
            props.onClick();
            return;
        }

        handleCreateCheckoutSession();
    }

    return (
        <div className={className}>
            <div className={styles.pricingCard__header}>
                <h5>{props.title}</h5>
                <p className={styles.pricingCard__header__description}>{props.description}</p>
            </div>

            <div className={styles.pricingCard__footer}>
                <div className={styles.pricingCard__footer__pricing}>
                    <h3 className={styles.pricingCard__header__price}>{props.price}</h3>
                    {props.pricingInterval && <p className={styles.pricingCard__header__pricingInterval}>{props.pricingInterval}</p>}
                </div>
                <AsyncButton
                    title="Select"
                    onClick={handleSelect}
                    color={props.selectColor}
                    loading={isLoading}
                />
            </div>
            <div className={styles.pricingCard__content}>
                <p className="description">What's included?</p>
                <ul>
                    {
                        props.features.map((feature, index) => {
                            return (
                                <li>
                                    <div>
                                        <FiCheck />
                                        {feature}
                                    </div>
                                </li>
                            );
                        })
                    }
                </ul>
            </div>
        </div>
    );
}

export default PricingCard;