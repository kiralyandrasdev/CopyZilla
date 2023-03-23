import React, { useContext, useEffect } from 'react';
import PurchaseSvg from '../../assets/purchase.svg';
import { AsyncButton } from '../../components';
import { openCustomerPortal } from '../../features/payment/actions/paymentActions';
import './PaymentOverdue.css';
import './AppPage.css';
import { AuthContext } from '../../features/authentication/authContext';
import { useCreateSubscriptionMutation as useCreateSubscriptionCheckoutSession, useCreateSubscriptionCheckoutSessionMutation, useGetUserQuery } from '../../features/api/apiSlice';
import { getAuth } from 'firebase/auth';

export default function PaymentOverduePage() {
    const { firebaseUid } = useContext(AuthContext);

    const {
        data: user,
        error,
        isError,
        isFetching,
    } = useGetUserQuery({ firebaseUid });

    const [
        createSubscriptionCheckoutSession,
        {
            data: checkoutSessionCreationData,
            isLoading: isCreatingCheckoutSession,
            isSuccess: isCheckoutSessionCreated,
            isError: isCheckoutSessionCreationError,
            error: checkoutSessionCreationError
        }
    ] = useCreateSubscriptionCheckoutSessionMutation();

    const handleSignOut = () => {
        const auth = getAuth();
        auth.signOut();
    }

    useEffect(() => {
        console.log("checkoutSessionCreationData: " + JSON.stringify(checkoutSessionCreationData));
        if (isCheckoutSessionCreated) {
            window.open(checkoutSessionCreationData, "_blank");
        }
    }, [isCheckoutSessionCreated]);

    const handleCreateSubscription = () => {
        createSubscriptionCheckoutSession({ userId: user.id });
    }

    return (
        <div className="page page__paymentOverdue">
            <img src={PurchaseSvg} className="illustration__150" alt="Loading..."></img>
            <h3>Payment overdue</h3>
            <p className='description'>Your last payment failed. Please update your payment information to continue using CopyZilla.</p>
            {
                user.subscriptionStatus === "canceled" ?
                    <AsyncButton
                        color="var(--green)"
                        title="Renew subscription"
                        onClick={() => handleCreateSubscription()}
                        isLoading={isCreatingCheckoutSession}
                    /> :
                    <AsyncButton
                        color="var(--green)"
                        title="Manage payment information"
                        onClick={() => openCustomerPortal(user.email)}
                    />
            }
            <p className='page__paymentOverdue__signOut' onClick={() => handleSignOut()}>Sign out</p>
        </div>
    );
}