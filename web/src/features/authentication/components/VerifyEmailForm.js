import { getAuth, sendEmailVerification } from 'firebase/auth';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AsyncButton, TextButton } from '../../../components';
import { signOutFirebaseUser } from '../actions/authActions';

function VerifyEmailForm() {
    const { email } = useSelector((state) => state.auth);
    const [message, setMessage] = useState(null);

    const dispatch = useDispatch();

    const handleVerifyEmail = async () => {
        const auth = getAuth();
        await sendEmailVerification(auth.currentUser);
        setMessage("Megerősítő e-mail elküldve.");
    }

    return (
        <div className="authForm loginForm">
            <div className="authForm__header">
                <h4>E-mail cím ellenőrzése</h4>
                <p className="description">Kérünk, ellenőrizd e-mail címed. A megerősítő linket elküldtük a {email} címre. Amennyiben nem találod az üzenetet, kérj új megerősítő linket.</p>
            </div>
            <div className="authForm__primaryActions">
                <AsyncButton onClick={() => handleVerifyEmail()} title="Megerősítő e-mail küldése"></AsyncButton>
            </div>
            {message && <p className="authForm__message">{message}</p>}
            <div className="authForm__secondaryActions">
                <TextButton color="var(--grey3)" title="Bejelentkezés más felhasználóval" onClick={() => dispatch(signOutFirebaseUser())} />
            </div>
        </div>
    );
}

export default VerifyEmailForm;