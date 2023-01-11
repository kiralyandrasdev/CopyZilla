import React, { useState } from "react";
import { HiOutlineMail } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { AsyncButton, TextButton, TextField } from "../../../components";
import "./AuthForm.css";

export default function RecoveryForm() {
    const [email, setEmail] = useState('');

    function handleEmailChange(event) {
        setEmail(event.target.value);
    };

    let navigate = useNavigate();
    const routeChange = (path) => {
        navigate(path);
    }

    return (
        <div className="auth-form">
            <h4>Fiók helyreállítása</h4>
            <p className="description-text">Amennyiben emlékszel a fiókodhoz tartozó e-mail címre, ellenőrző kódot küldünk a folytatáshoz</p>
            <div className="auth-form-input">
                <div className="auth-field">
                    <TextField hint="E-mail cím" title="E-mail cím" value={email} suffixIcon={<HiOutlineMail />} onChange={handleEmailChange}></TextField>
                </div>
            </div>
            <div id="auth-button">
                <AsyncButton loading={false} onClick={() => routeChange("/auth/login")} title="Ellenőrző kód küldése"></AsyncButton>
            </div>
            <div className="auth-type-switch-container">
                <TextButton title="Bejelentkezés" onClick={() => routeChange("/auth/login")} />
            </div>
        </div>
    );
}