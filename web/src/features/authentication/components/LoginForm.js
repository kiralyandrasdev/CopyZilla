import React, { useState } from "react";
import { HiOutlineMail } from "react-icons/hi";
import { RiLockPasswordLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import "./AuthForm.css";
import { AsyncButton, TextField } from "../../../components";

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
    const routeChange = () => {
        let path = `/user/home`;
        navigate(path);
    }

    return (
        <div className="auth-form">
            <h4>Üdvözlünk</h4>
            <p>Kérlek jelentkezz be a fiókodba</p>
            <div className="email-field">
                <TextField hint="E-mail cím" title="E-mail cím" value={email} suffixIcon={<HiOutlineMail />} onChange={handleEmailChange}></TextField>
            </div>
            <div className="password-field">
                <TextField hint="Jelszó" title="Jelszó" value={password} suffixIcon={<RiLockPasswordLine />} onChange={handlePasswordChange} password={true}></TextField>
            </div>
            <div id="login-button">
                <AsyncButton onClick={() => routeChange()} title="Bejelentkezés"></AsyncButton>
            </div>
        </div>
    );
}