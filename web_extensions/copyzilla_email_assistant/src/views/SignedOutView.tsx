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
            <h2>Sign in to your account</h2>
            <LoginForm />
            <p className="description textButton" onClick={() => handleNewAccountClick()}>Create new account</p>
        </div>
    );
}

export default SignedOutView;