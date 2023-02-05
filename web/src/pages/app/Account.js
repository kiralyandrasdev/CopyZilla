import React from "react";
import { FiKey, FiMail } from "react-icons/fi";
import { useSelector } from "react-redux";
import { LoadingIndicator, TextButton } from "../../components";
import { useGetUserQuery } from "../../features/api/apiSlice";
import { openCustomerPortal } from "../../features/payment/actions/paymentActions";
import './Account.css';
import './AppPage.css';

function getDate(date) {
    const d = new Date(date);
    return d.toLocaleDateString();
}

export default function Profile() {
    const { firebaseUid } = useSelector((state) => state.auth);

    const {
        data: user,
        error,
        isFetching,
    } = useGetUserQuery({ firebaseUid });

    const content = () => {
        if (isFetching) {
            return <LoadingIndicator color="white"></LoadingIndicator>;
        }

        if (error) {
            return <p>Hiba történt</p>;
        }

        return (
            <>
                <div className="page__account__section">
                    <h5>Fiók</h5>
                    <p className="description email__heading">{user.email}</p>
                    <div className="spacer"></div>
                    <div className="account__buttons">
                        <TextButton color="white" prefixIcon={<FiKey />} title="Jelszó megváltoztatása"></TextButton>
                        <TextButton color="white" prefixIcon={<FiMail />} title="E-mail cím megváltoztatása"></TextButton>
                    </div>
                </div>
                <div className="page__account__section">
                    <h5>Előfizetés</h5>
                    <div className="spacer"></div>
                    <p>{user.subscriptionPlanName}</p>
                    <p className="description">Megújul ekkor: {getDate(user.subscriptionValidUntil)}</p>
                    <TextButton color="var(--green)" underline={true} title="Előfizetés és fizetési adatok kezelése" onClick={() => openCustomerPortal(user.email)}></TextButton>
                </div>
                <TextButton color="var(--grey2)" underline={true} title="Fiók törlése"></TextButton>
            </>
        );
    }

    return (
        <div className="page page__account page__centerContent animation__fadeInUp">
            {content()}
        </div >
    );
}