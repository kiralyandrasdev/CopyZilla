import React from 'react'
import LoginForm from '../features/authentication/LoginForm';
import './View.css';
import { getWebsiteUrl } from '../config/envConfig';

function SignedOutView() {

    const handleNewAccountClick = async () => {
        const websiteUrl = await getWebsiteUrl();
        const url = `${websiteUrl}/auth/signup`;
        window.open(url, "_blank");   
    }

    return (
        <div className="view view__signedOut">
            <h2>Jelentkezz be a fiókodba</h2>
            <LoginForm />
            <p className="description textButton" onClick={() => handleNewAccountClick()}>Új fiók létrehozása</p>
        </div>
    );
}

export default SignedOutView;