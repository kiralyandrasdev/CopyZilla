import React, { useContext, useState } from 'react';
import { useSelector } from 'react-redux';
import { AsyncButton } from '../../../components';
import { AuthContext } from '../../authentication/authContext';
import { CHECKOUT_MODE, createCheckoutSessionAsync } from '../actions/paymentActions';
import './CreditRefillOption.css';

function CreditRefillOption(props) {
    const [isLoading, setIsLoading] = useState(false);
    const { firebaseUid } = useContext(AuthContext);

    const { accessToken } = useSelector(state => state.auth)

    const handleCreateCheckoutSession = async () => {
        setIsLoading(true);
        const redirectUrl = await createCheckoutSessionAsync(CHECKOUT_MODE.PAYMENT, { firebaseUid: firebaseUid, priceId: props.item.priceId }, accessToken);
        setIsLoading(false);

        if (redirectUrl) {
            window.open(redirectUrl, '_blank', 'noopener,noreferrer');
        }
    }

    let className = "credit__option animation__fadeInUp dropshadow";

    if (props.hasOwnProperty("order")) {
        className += ` credit__option__${props.order}`;
    }

    return (
        <div className={className}>
            <div className="credit__option__header">
                <h6>{props.item.name}</h6>
                <p>{props.item.priceFormatted}</p>
            </div>
            <p className="description">{props.item.description}</p>
   {/*          <span className="credit__option__divider"></span>
            <h5>{props.item.creditFormatted}</h5> */}
            <AsyncButton loading={isLoading} onClick={handleCreateCheckoutSession} title="Select"></AsyncButton>
        </div>
    );
}

export default CreditRefillOption;