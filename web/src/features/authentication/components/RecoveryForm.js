import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import React, { useState } from "react";
import { HiOutlineMail } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { AsyncButton, TextButton, TextField } from "../../../components";
import "./AuthForm.css";

export default function RecoveryForm() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const [emailError, setEmailError] = useState(false);

    function handleEmailChange(event) {
        setEmail(event.target.value);
    };

    let navigate = useNavigate();
    const routeChange = (path) => {
        navigate(path);
    }

    const canSendEmail = () => {
        if (email.length === 0) {
            setEmailError(true);
            return false;
        }
        setEmailError(false);
        return true;
    }

    window.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            handlePasswordResetEmail();
        }
    });

    const handlePasswordResetEmail = () => {
        if (!canSendEmail()) return;
        setMessage(null);
        setErrorMessage(null);
        const auth = getAuth();
        sendPasswordResetEmail(auth, email)
            .then(() => {
                setMessage("E-mail sikeresen elküldve");
            })
            .catch((error) => {
                setErrorMessage(error.message);
            });
    }

    return (
        <div className="authForm recoveryForm">
            <div className="authForm__header">
                <h4>Recover account</h4>
                <p className="description-text">We will send you an email with a link to reset your password.</p>
            </div>
            <div className="authForm__field__container">
                <div className="authForm__field__email">
                    <TextField error={emailError} light={true} hint="Email address" value={email} suffixIcon={<HiOutlineMail />} onChange={handleEmailChange}></TextField>
                </div>
            </div>
            <div className="authForm__primaryActions">
                <AsyncButton loading={false} onClick={() => handlePasswordResetEmail()} title="Send verification link"></AsyncButton>
            </div>
            {message && <p className="authForm__message">{message}</p>}
            {errorMessage && <p style={{ "color": "var(--red)" }} className="red">{errorMessage}</p>}
            <div className="authForm__secondaryActions">
                <TextButton color="var(--grey3)" title="Sign in" onClick={() => routeChange("/auth/login")} />
            </div>
        </div>
    );
}