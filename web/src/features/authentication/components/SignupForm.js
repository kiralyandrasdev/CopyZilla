import React, { useState } from "react";
import { HiOutlineMail } from "react-icons/hi";
import { RiLockPasswordLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { AsyncButton, TextButton, TextField } from "../../../components";
import "./AuthForm.css";

export default function SignupForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setConfirmationPassword] = useState('');

    function handleEmailChange(event) {
        setEmail(event.target.value);
    };

    function handlePasswordChange(event) {
        setPassword(event.target.value);
    };

    function handlePasswordConfirmationChange(event) {
        setConfirmationPassword(event.target.value);
    };

    let navigate = useNavigate();
    const routeChange = (path) => {
        navigate(path);
    }

    return (
        <div className="auth-form">
            <h4>Új fiók létrehozása</h4>
            <p className="description-text">Hozz létre új fiókot</p>
            <div className="auth-form-input">
                <div className="auth-field">
                    <TextField title="E-mail cím" hint="Fiókhoz tartozó e-mail cím" value={email} onChange={handleEmailChange} suffixIcon={<HiOutlineMail />}></TextField>
                </div>
                <div className="auth-field">
                    <TextField title="Jelszó" hint="Erős jelszó" value={password} onChange={handlePasswordChange} suffixIcon={<RiLockPasswordLine />} password={true}></TextField>
                </div>
                <div className="auth-field">
                    <TextField title="Jelszó megerősítése" hint="Erős jelszó mégegyszer" value={passwordConfirmation} onChange={handlePasswordConfirmationChange} suffixIcon={<RiLockPasswordLine />} password={true}></TextField>
                </div>
            </div>
            <div id="auth-button">
                <AsyncButton title="Regisztráció" onClick={() => routeChange("/user/editor")}></AsyncButton>
            </div>
            <div className="auth-type-switch-container">
                <p>Már van fiókod? </p>
                <TextButton title="Bejelentkezés" onClick={() => routeChange("/auth/login")} />
            </div>
        </div>
    );
}