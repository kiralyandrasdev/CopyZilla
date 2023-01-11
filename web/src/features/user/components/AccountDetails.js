import React, { useContext } from "react";
import { FiKey, FiMail } from "react-icons/fi";
import { TextButton } from "../../../components";
import { UserContext } from "../context/userContext";
import './AccountDetails.css';

export default function AccountDetails() {
    const { user } = useContext(UserContext);

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