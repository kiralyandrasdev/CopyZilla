import React, { useState } from "react";
import { HiOutlineMail } from "react-icons/hi";
import { RiLockPasswordLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { AsyncButton, TextButton, TextField } from "../../../components";
import "./AuthForm.css";

export default function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

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

    return (
        <div className="auth-form">
            <h4>Üdvözlünk</h4>
            <p>Kérlek jelentkezz be a fiókodba</p>
            <div className="auth-form-input">
                <div className="auth-field">
                    <TextField hint="E-mail cím" title="E-mail cím" value={email} suffixIcon={<HiOutlineMail />} onChange={handleEmailChange}></TextField>
                </div>
                <div className="auth-field">
                    <TextField hint="Jelszó" title="Jelszó" value={password} suffixIcon={<RiLockPasswordLine />} onChange={handlePasswordChange} password={true}></TextField>
                </div>
            </div>
            <div id="auth-button">
                <AsyncButton onClick={() => routeChange("/user/editor")} title="Bejelentkezés"></AsyncButton>
            </div>
            <div className="auth-type-switch-container">
                <p>Nincs fiókod? </p>
                <TextButton title="Fiók létrehozása" onClick={() => routeChange("/auth/signup")} />
            </div>
        </div>
    );
}