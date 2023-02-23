import React from 'react'
import styles from './PricingCard.module.css'
import { AsyncButton } from '../../../../components';
import { FiCheck } from 'react-icons/fi';

function PricingCard(props) {
    let className = `${styles.pricingCard} ${styles[`pricingCard__${props.order}`]} animation__fadeInUp`;

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
                    title="Ezt választom"
                    onClick={props.onClick}
                    color={props.selectColor}
                />
            </div>
            <div className={styles.pricingCard__content}>
                <p>Tartalmazza:</p>
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