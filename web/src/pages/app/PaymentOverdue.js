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
            <h4>A legutóbbi kifizetés nem sikerült</h4>
            <p className='description'>Frissítsd fizetési adataid, hogy folytathasd a munkát, vagy válts ingyenes csomagunkra.</p>
            <AsyncButton color="green" title="Fizetési adatok módosítása" onClick={() => openCustomerPortal(user.email)}></AsyncButton>
            <TextButton className="animation__fadeInUp" color="var(--grey2)" underline={true} title="Ingyenes csomagra váltok" onClick={() => openCustomerPortal(user.email)}></TextButton>
        </div>
    );
}