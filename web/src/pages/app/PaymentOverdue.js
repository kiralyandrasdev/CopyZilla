import React, { useContext } from 'react';
import PurchaseSvg from '../../assets/purchase.svg';
import { AsyncButton, TextButton } from '../../components';
import { openCustomerPortal } from '../../features/payment/actions/paymentActions';
import './PaymentOverdue.css';
import './AppPage.css';
import { AuthContext } from '../../features/authentication/authContext';
import { useGetUserQuery } from '../../features/api/apiSlice';

export default function PaymentOverduePage() {
    const { firebaseUid } = useContext(AuthContext);

    const {
        data: user,
        error,
        isError,
        isFetching,
    } = useGetUserQuery({ firebaseUid });

    return (
        <div className="page page__paymentOverdue">
            <img src={PurchaseSvg} className="illustration__150" alt="Loading..."></img>
            <h3>Payment overdue</h3>
            <p className='description'>Your last payment failed. Please update your payment information to continue using CopyZilla.</p>
            {
                user.product.scope === "individual" ?
                <AsyncButton
                    color="var(--green)"
                    title="Manage payment information"
                    onClick={() => openCustomerPortal(user.email)}
                />
                : "Please contact your administrator to update your payment information."
            }
        </div>
    );
}