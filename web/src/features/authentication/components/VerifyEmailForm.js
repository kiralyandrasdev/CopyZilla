import { getAuth, sendEmailVerification } from 'firebase/auth';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AsyncButton, TextButton } from '../../../components';
import { logout } from '../actions/authActions';
import { AuthContext } from '../authContext';

function VerifyEmailForm() {
    const { user } = useContext(AuthContext);
    const [message, setMessage] = useState(null);

    const handleVerifyEmail = async () => {
        const auth = getAuth();
        await sendEmailVerification(auth.currentUser);
        setMessage("Megerősítő e-mail elküldve.");
    }

    const handleSignOut = async () => {
        await logout();
    }

    return (
        <div className="authForm loginForm">
            <div className="authForm__header">
                <h4>E-mail cím ellenőrzése</h4>
                {user && <p className="description">Kérünk, ellenőrizd e-mail címed. A megerősítő linket elküldtük a {user.email} címre. Amennyiben nem találod az üzenetet, kérj új megerősítő linket.</p>}
            </div>
            <div className="authForm__primaryActions">
                <AsyncButton onClick={() => handleVerifyEmail()} title="Megerősítő e-mail küldése"></AsyncButton>
            </div>
            {message && <p className="authForm__message">{message}</p>}
            <div className="authForm__secondaryActions">
                <TextButton color="var(--grey3)" title="Bejelentkezés más felhasználóval" onClick={() => handleSignOut()} />
            </div>
        </div>
    );
}

export default VerifyEmailForm;