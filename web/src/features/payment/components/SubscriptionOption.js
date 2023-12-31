import React, { useContext, useState } from 'react';
import { useSelector } from 'react-redux';
import { AsyncButton } from '../../../components';
import { UserContext } from '../../user/context/userContext';
import { CHECKOUT_MODE, createCheckoutSessionAsync } from '../actions/paymentActions';
import './SubscriptionOption.css';

function SubscriptionOption(props) {
    const [isLoading, setIsLoading] = useState(false);
    const { firebaseUid } = useContext(UserContext);

    const { accessToken } = useSelector(state => state.auth)

    const handleCreateCheckoutSession = async () => {
        setIsLoading(true);
        const redirectUrl = await createCheckoutSessionAsync(CHECKOUT_MODE.SUBSCRIPTION, { firebaseUid: firebaseUid, priceId: props.item.priceId }, accessToken);
        setIsLoading(false);

        if (redirectUrl) {
            window.open(redirectUrl, '_blank', 'noopener,noreferrer');
        }
    }

    let className = "subscription__option animation__fadeInUp dropshadow";

    if (props.hasOwnProperty("order")) {
        className += ` subscription__option__${props.order}`;
    }

    return (
        <div className={className}>
            <h5>{props.item.name}</h5>
            <ul>
                <li className="description">{props.item.creditFormatted}</li>
            </ul>
            <span className="subscription__option__divider"></span>
            <div className="subscription__option__price__container">
                <h6>{props.item.priceFormatted}</h6>
                <p className="description">per month</p>
            </div>
            <AsyncButton loading={isLoading} onClick={handleCreateCheckoutSession} title="Select"></AsyncButton>
        </div>
    );
}

export default SubscriptionOption;