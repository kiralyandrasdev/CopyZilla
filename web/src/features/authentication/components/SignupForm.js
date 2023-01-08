import React, { useState } from "react";
import { HiOutlineMail } from "react-icons/hi";
import { RiLockPasswordLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import "./AuthForm.css";
import { AsyncButton, TextField } from "../../../components";

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

    return (
        <div className="auth-form">
            <h4>Új fiók létrehozása</h4>
            <p>Hozz létre új fiókot</p>
            <div className="email-field">
                <TextField title="E-mail cím" value={email} onChange={handleEmailChange} suffixIcon={<HiOutlineMail />}></TextField>
            </div>
            <div className="password-field">
                <TextField title="Jelszó" value={password} onChange={handlePasswordChange} suffixIcon={<RiLockPasswordLine />} password={true}></TextField>
            </div>
            <div className="password-field">
                <TextField title="Jelszó megerősítése" value={passwordConfirmation} onChange={handlePasswordConfirmationChange} suffixIcon={<RiLockPasswordLine />} password={true}></TextField>
            </div>
            <div id="signup-button">
                <AsyncButton title="Regisztráció"></AsyncButton>
            </div>
        </div>
    );
}