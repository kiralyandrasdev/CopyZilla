import React, { useContext } from 'react'
import styles from './PaymentOverdueView.module.css';
import PrimaryButton from '../components/PrimaryButton';
import { stripeCustomerPortalUrl } from '../config/envConfig';
import { AuthContext } from '../context/authContext';
import TextButton from '../components/TextButton';
import { getAuth } from '@firebase/auth';
import ChoiceSvg from '../assets/choice.svg';

function PaymentOverdueView() {
    const { user } = useContext(AuthContext);

    const handleManagePaymentInformation = () => {
        const url = `${stripeCustomerPortalUrl}?prefilled_email=${user?.email}`;
        window.open(url, '_blank', 'noopener,noreferrer');
    }

    return (
        <div className={styles.view}>
            <img src={ChoiceSvg} alt="" className='illustration' />
            <h5>Looks like your last payment didn't go through</h5>
            <p className="">
                Please make sure you have a valid payment method on file. If you have any questions, please contact us at info@copyzilla.eu
            </p>
            <PrimaryButton
                title="Manage payment information"
                onClick={() => handleManagePaymentInformation()}
                isLoading={false}
            />
            <TextButton
                text="Sign in with a different account"
                onClick={() => {
                    const auth = getAuth();
                    auth.signOut();
                }}
            />
        </div>
    );
}

export default PaymentOverdueView;