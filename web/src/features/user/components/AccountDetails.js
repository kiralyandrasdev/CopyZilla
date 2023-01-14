import React from "react";
import { FiKey, FiMail } from "react-icons/fi";
import { useSelector } from "react-redux";
import { TextButton } from "../../../components";
import { useGetUserQuery } from "../../api/apiSlice";
import './AccountDetails.css';

export default function AccountDetails() {
    const { firebaseUid } = useSelector((state) => state.auth);
    const {
        email,
        lastName,
        firstName,
        subscriptionPlanName,
        subscriptionValidUntil,
    } = useGetUserQuery({ firebaseUid: firebaseUid }).data || {};

    return (
        <div id="account-details-container">
            <h2>Fiók</h2>
            <p className="description-text">{email}</p>
            <h5 className="account-section-header">Előfizetés</h5>
            <p>{subscriptionPlanName}</p>
            <p className="description-text" id="renews-at-text">Megújul ekkor: {subscriptionValidUntil}</p>
            <TextButton color="#6b4eff" title="Előfizetés és fizetési adatok kezelése"></TextButton>
            <TextButton color="#6b4eff" title="Kredit vásárlás"></TextButton>
            <h5 className="account-section-header">Fiók</h5>
            <TextButton id="change-password-button" prefixIcon={<FiKey />} title="Jelszó megváltoztatása"></TextButton>
            <TextButton id="change-email-button" prefixIcon={<FiMail />} title="E-mail cím megváltoztatása"></TextButton>
            <TextButton id="delete-account-button" title="Fiók törlése"></TextButton>
        </div >
    )
} 