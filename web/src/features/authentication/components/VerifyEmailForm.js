import { getAuth, sendEmailVerification } from 'firebase/auth';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AsyncButton, TextButton } from '../../../components';
import { logout } from '../actions/authActions';
import { AuthContext } from '../authContext';

function VerifyEmailForm() {
    const { user } = useContext(AuthContext);
    const [message, setMessage] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleVerifyEmail = async () => {
        setIsLoading(true);

        const auth = getAuth();

        try {
            await sendEmailVerification(auth.currentUser);
        } catch (error) {
            setMessage(null);
            setErrorMessage(error.code);
            setIsLoading(false);
            return;
        }

        setIsLoading(false);
        setErrorMessage(null);
        setMessage("Verification email sent. Please check your inbox.");
    }

    const handleSignOut = async () => {
        await logout();
    }

    return (
        <div className="authForm loginForm">
            <div className="authForm__header">
                <h4>Verify address</h4>
                {user && <p className="description">We have sent a verification link to {user.email}. Please check your inbox and click the link to verify your email address.</p>}
            </div>
            <div className="authForm__primaryActions">
                <AsyncButton
                    onClick={() => handleVerifyEmail()}
                    title="Send verification email"
                    loading={isLoading}
                />
            </div>
            {message && <p className="authForm__message">{message}</p>}
            {errorMessage && <p className="red">{errorMessage}</p>}
            <div className="authForm__secondaryActions">
                <TextButton color="var(--grey3)" title="Sign in with a different account" onClick={() => handleSignOut()} />
            </div>
        </div>
    );
}

export default VerifyEmailForm;