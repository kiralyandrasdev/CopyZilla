import React, { useContext } from 'react';
import PurchaseSvg from '../../assets/purchase.svg';
import { AsyncButton, TextButton } from '../../components';
import { UserContext } from '../../features';
import { openCustomerPortal } from '../../features/payment/actions/paymentActions';
import './PaymentOverdue.css';
import './AppPage.css';

export default function PaymentOverduePage() {
    const { user } = useContext(UserContext);

    return (
        <div className="page page__paymentOverdue">
            <img src={PurchaseSvg} className="illustration__150" alt="Loading..."></img>
            <h3>Payment overdue</h3>
            <p className='description'>Your last payment failed. Please update your payment information to continue using CopyZilla.</p>
            <AsyncButton
                color="var(--green)"
                title="Manage payment information"
                onClick={() => openCustomerPortal(user.email)}
            />
        </div>
    );
}