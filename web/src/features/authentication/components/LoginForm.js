import React, { useState } from "react";
import { HiOutlineMail } from "react-icons/hi";
import { RiLockPasswordLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { AsyncButton, TextButton, TextField } from "../../../components";
import { login } from "../actions/authActions";
import { firebaseLoginErrorMessage } from "../utils/authUtils";
import "./AuthForm.css";

export default function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);

    function handleEmailChange(event) {
        setEmail(event.target.value);
    };

    function handlePasswordChange(event) {
        setPassword(event.target.value);
    };

    let navigate = useNavigate();
    const routeChange = (path) => {
        navigate(path);
    }

    const canSubmit = () => {
        if (email.length === 0) {
            setError('E-mail cím megadása kötelező');
            setEmailError(true);
            return false;
        } else {
            setEmailError(false);
        }
        if (password.length === 0) {
            setError('Jelszó megadása kötelező');
            setPasswordError(true);
            return false;
        } else {
            setPasswordError(false);
        }
        return true;
    }

    const handleLogin = async () => {
        if (!canSubmit()) return;
        setIsLoading(true);
        setError('');
        try {
            await login({ email, password });
        } catch (e) {
            setError(firebaseLoginErrorMessage(e.code));
        }
        setIsLoading(false);
    }

    return (
        <div className="authForm loginForm">
            <div className="authForm__header">
                <h4>Üdvözlünk</h4>
                <p className="description">Jelentkezz be a fiókodba</p>
            </div>
            <div className="authForm__field__container">
                <div className="authForm__field__email">
                    <TextField light={true} error={emailError} hint="E-mail cím" title="E-mail cím" value={email} suffixIcon={<HiOutlineMail />} onChange={handleEmailChange}></TextField>
                </div>
                <div className="authForm__field__password">
                    <TextField light={true} error={passwordError} hint="Jelszó" title="Jelszó" value={password} suffixIcon={<RiLockPasswordLine />} onChange={handlePasswordChange} password={true}></TextField>
                </div>
                <a className="description loginForm__passwordRecovery" href="/auth/accountRecovery">Elfelejtetted a jelszavad?</a>
            </div>
            <div className="authForm__primaryActions">
                <AsyncButton loading={isLoading} onClick={() => handleLogin()} title="Bejelentkezés"></AsyncButton>
            </div>
            {error && <p style={{ "color": "var(--red)", "textAlign": "center" }}>{error}</p>}
            <div className="authForm__secondaryActions">
                <p className="description loginForm__noAccountQuestion">Nincs fiókod? </p>
                <TextButton color="var(--grey3)" title="Fiók létrehozása" onClick={() => routeChange("/auth/signup")} />
            </div>
        </div>
    );
}