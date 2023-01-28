import React, { useCallback, useState } from "react";
import { HiOutlineMail } from "react-icons/hi";
import { RiLockPasswordLine } from "react-icons/ri";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { AsyncButton, TextButton, TextField } from "../../../components";
import { loginFirebaseUser } from "../actions/authActions";
import { resetAuthError } from "../authSlice";
import "./AuthForm.css";

export default function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [emailErrorMessage, setEmailErrorMessage] = useState('');
    const [passwordErrorMessage, setPasswordErrorMessage] = useState('');

    const { loading, error } = useSelector((state) => state.auth);

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
        dispatch(resetAuthError());
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
        dispatch(loginFirebaseUser({ email, password }));
    }

    const loginErrorMessage = useCallback(() => {
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
        if (error == "auth/network-request-failed") {
            return "Hálózati hiba";
        }
        return error;
    }, [emailErrorMessage, passwordErrorMessage, error]);

    return (
        <div className="authForm loginForm">
            <div className="authForm__header">
                <h4>Üdvözlünk</h4>
                <p className="description">Jelentkezz be a fiókodba</p>
            </div>
            <div className="authForm__field__container">
                <div className="authForm__field__email">
                    <TextField light={true} error={emailErrorMessage} hint="E-mail cím" title="E-mail cím" value={email} suffixIcon={<HiOutlineMail />} onChange={handleEmailChange}></TextField>
                </div>
                <div className="authForm__field__password">
                    <TextField light={true} error={passwordErrorMessage} hint="Jelszó" title="Jelszó" value={password} suffixIcon={<RiLockPasswordLine />} onChange={handlePasswordChange} password={true}></TextField>
                </div>
                <a className="description loginForm__passwordRecovery" href="/auth/accountRecovery">Elfelejtetted a jelszavad?</a>
            </div>
            <div className="authForm__primaryActions">
                <AsyncButton loading={loading} onClick={() => handleLogin()} title="Bejelentkezés"></AsyncButton>
            </div>
            {loginErrorMessage() ? <p style={{ "color": "var(--red)", "textAlign": "center" }}>{loginErrorMessage()}</p> : null}
            <div className="authForm__secondaryActions">
                <p className="description loginForm__noAccountQuestion">Nincs fiókod? </p>
                <TextButton color="var(--grey3)" title="Fiók létrehozása" onClick={() => routeChange("/auth/signup")} />
            </div>
        </div>
    );
}