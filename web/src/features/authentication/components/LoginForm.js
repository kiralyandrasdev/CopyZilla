import React, { useCallback, useEffect, useState } from "react";
import { HiOutlineMail } from "react-icons/hi";
import { RiLockPasswordLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { AsyncButton, TextButton, TextField } from "../../../components";
import { loginUser } from "../actions/authActions";
import "./AuthForm.css";

import { useDispatch, useSelector } from 'react-redux';

export default function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [emailErrorMessage, setEmailErrorMessage] = useState('');
    const [passwordErrorMessage, setPasswordErrorMessage] = useState('');

    const { accessToken, loading, error } = useSelector(
        (state) => state.auth
    )

    useEffect(() => {
        if (accessToken) {
            routeChange("/user/editor");
        }
    }, [accessToken]);

    const dispatch = useDispatch();

    function handleEmailChange(event) {
        setEmail(event.target.value);
    };

    function handlePasswordChange(event) {
        setPassword(event.target.value);
    };

    const updateEmailErrorMessage = (value) => {
        setEmailErrorMessage(value);
    }

    const updatePasswordErrorMessage = (value) => {
        setPasswordErrorMessage(value);
    }

    let navigate = useNavigate();
    const routeChange = (path) => {
        navigate(path);
    }

    const handleLogin = () => {
        if (email === '') {
            updateEmailErrorMessage('E-mail cím megadása kötelező');
            return;
        } else {
            updateEmailErrorMessage('');
        }
        if (password === '') {
            updatePasswordErrorMessage('Jelszó megadása kötelező');
            return;
        } else {
            updatePasswordErrorMessage('');
        }
        dispatch(loginUser({ email, password }));
    }

    const authErrorMessage = useCallback(() => {
        if (emailErrorMessage) return emailErrorMessage;
        if (passwordErrorMessage) return passwordErrorMessage;
        if (!error) return error;
        if (error == "auth/invalid-email") {
            return "Helytelen e-mail cím";
        }
        if (error == "auth/user-not-found") {
            return "Nem található felhasználó";
        }
        if (error == "auth/wrong-password") {
            return "Helytelen jelszó";
        }
        return error;
    });

    return (
        <div className="auth-form">
            <h4>Üdvözlünk</h4>
            <p className="description-text">Kérlek jelentkezz be a fiókodba</p>
            <div className="auth-form-input">
                <div className="auth-field">
                    <TextField error={emailErrorMessage} hint="E-mail cím" title="E-mail cím" value={email} suffixIcon={<HiOutlineMail />} onChange={handleEmailChange}></TextField>
                </div>
                <div className="auth-field">
                    <TextField error={passwordErrorMessage} hint="Jelszó" title="Jelszó" value={password} suffixIcon={<RiLockPasswordLine />} onChange={handlePasswordChange} password={true}></TextField>
                </div>
                <a style={{ 'color': 'grey' }} href="/auth/accountRecovery">Elfelejtetted a jelszavad?</a>
            </div>
            <div id="auth-button">
                <AsyncButton loading={loading} onClick={() => handleLogin()} title="Bejelentkezés"></AsyncButton>
            </div>
            {authErrorMessage() ? <p style={{ 'color': 'red', 'margin': '20px 0px 0px 0px' }}>{authErrorMessage()}</p> : null}
            <div className="auth-type-switch-container">
                <p>Nincs fiókod? </p>
                <TextButton title="Fiók létrehozása" onClick={() => routeChange("/auth/signup")} />
            </div>
        </div>
    );
}