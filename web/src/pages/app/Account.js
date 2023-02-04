import React, { useContext } from "react";
import { FiKey, FiMail } from "react-icons/fi";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LoadingIndicator, TextButton } from "../../components";
import { useGetUserQuery } from "../../features/api/apiSlice";
import { openCustomerPortal } from "../../features/payment/actions/paymentActions";
import './Account.css';

export default function Profile() {
    const { firebaseUid } = useSelector((state) => state.auth);

    const {
        data: user,
        error,
        isLoading,
        isFetching,
        isSuccess,
    } = useGetUserQuery({ firebaseUid });

    const navigate = useNavigate();

    const content = () => {
        if (isLoading) {
            return <LoadingIndicator color="white"></LoadingIndicator>
        }

        return (
            <>
                <div className="page__account__section">
                    <h4>Fiók</h4>
                    <p className="description">{user.email}</p>
                </div>
                <div className="page__account__section">
                    <h5>Előfizetés</h5>
                    <p>{user.subscriptionPlanName}</p>
                    <p className="description">Megújul ekkor: {user.subscriptionValidUntil}</p>
                    <TextButton color="var(--green)" title="Előfizetés és fizetési adatok kezelése" onClick={() => openCustomerPortal(user.email)}></TextButton>
                </div>
                <div className="page__account__section">
                    <h5>Biztonság</h5>
                    <TextButton color="white" prefixIcon={<FiKey />} title="Jelszó megváltoztatása"></TextButton>
                    <TextButton color="white" prefixIcon={<FiMail />} title="E-mail cím megváltoztatása"></TextButton>
                </div>
                <TextButton color="var(--red)" title="Fiók törlése"></TextButton>
            </>
        );
    }

    return (
        <div className="page page__account page__centerContent animation__fadeInUp">
            {content()}
        </div >
    );
}