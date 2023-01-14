import React, { useEffect } from "react";
import { FiKey, FiMail } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { LoadingIndicator, TextButton } from "../../../components";
import { useGetUserQuery } from "../../api/apiSlice";
import { getUser } from "../actions/userActions";
import './AccountDetails.css';

export default function AccountDetails() {
    const { firebaseUid } = useSelector((state) => state.auth);
    const {
        data: user,
        error,
        isLoading,
        isFetching,
        isSuccess,
    } = useGetUserQuery({ firebaseUid });

    if (isLoading || isFetching) {
        return <LoadingIndicator></LoadingIndicator>
    }

    return (
        <div id="account-details-container">
            <h2>Fiók</h2>
            <p className="description-text">{user.email}</p>
            <h5 className="account-section-header">Előfizetés</h5>
            <p>{user.subscriptionPlanName}</p>
            <p className="description-text" id="renews-at-text">Megújul ekkor: {user.subscriptionValidUntil}</p>
            <TextButton color="#6b4eff" title="Előfizetés és fizetési adatok kezelése"></TextButton>
            <TextButton color="#6b4eff" title="Kredit vásárlás"></TextButton>
            <h5 className="account-section-header">Fiók</h5>
            <TextButton id="change-password-button" prefixIcon={<FiKey />} title="Jelszó megváltoztatása"></TextButton>
            <TextButton id="change-email-button" prefixIcon={<FiMail />} title="E-mail cím megváltoztatása"></TextButton>
            <TextButton id="delete-account-button" title="Fiók törlése"></TextButton>
        </div >
    )
} 