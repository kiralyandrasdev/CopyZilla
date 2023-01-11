import React, { useContext, useEffect, useState } from "react";
import { LoadingIndicator } from "../components";
import { AuthContext, UserContext } from "../features";
import AccountDetails from "../features/user/components/AccountDetails";
import { getUser } from "../features/user/services/userService";
import './Account.css';

export default function Profile() {
    return (
        <div className="profile-page">
            <AccountDetails>
            </AccountDetails>
        </div >
    );
}