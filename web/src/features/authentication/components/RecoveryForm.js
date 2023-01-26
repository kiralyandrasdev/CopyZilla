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
        <div className="authForm recoveryForm">
            <div className="authForm__header">
                <h4>Fiók helyreállítása</h4>
                <p className="description-text">A folytatáshoz ellenőrző kódot küldünk a fiókhoz tartozó e-mail címre</p>
            </div>
            <div className="authForm__field__container">
                <div className="authForm__field__email">
                    <TextField light={true} hint="E-mail cím" title="E-mail cím" value={email} suffixIcon={<HiOutlineMail />} onChange={handleEmailChange}></TextField>
                </div>
            </div>
            <div className="authForm__primaryActions">
                <AsyncButton loading={false} onClick={() => routeChange("/auth/login")} title="Ellenőrző kód küldése"></AsyncButton>
            </div>
            <div className="authForm__secondaryActions">
                <TextButton color="var(--grey3)" title="Bejelentkezés" onClick={() => routeChange("/auth/login")} />
            </div>
        </div>
    );
}