import { sendEmailVerification } from "firebase/auth";
import React, { useContext, useEffect, useState } from "react";
import { HiOutlineMail } from "react-icons/hi";
import { RiLockPasswordLine } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AsyncButton, TextButton, TextField } from "../../../components";
import { useCreateUserMutation } from "../../api/apiSlice";
import { deleteAccount, login, logout, signup } from "../actions/authActions";
import { firebaseSignupErrorMessage } from "../utils/authUtils";
import "./AuthForm.css";

export default function SignupForm() {
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(false);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setConfirmationPassword] = useState('');

    const [error, setError] = useState('');
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [passwordConfirmationError, setPasswordConfirmationError] = useState(false);

    function handleEmailChange(event) {
        setEmail(event.target.value);
    };

    function handlePasswordChange(event) {
        setPassword(event.target.value);
    };

    function handlePasswordConfirmationChange(event) {
        setConfirmationPassword(event.target.value);
    };

    useEffect(() => {
        setError(error);
    }, [user, error]);

    const [
        createUser,
        {
            isLoading: userCreateLoading,
            error: userCreateError,
            data: user,
            isSuccess: userCreateSuccess,
            isError: userCreateErrorOccurred,
        }
    ] = useCreateUserMutation();

    const loading = isLoading || userCreateLoading;

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
        if (passwordConfirmation.length === 0) {
            setError('Jelszó megerősítése kötelező');
            setPasswordConfirmationError(true);
            return false;
        } else {
            setPasswordConfirmationError(false);
        }
        if (password !== passwordConfirmation) {
            setError('A két jelszó nem egyezik');
            setPasswordConfirmationError(true);
            return false;
        } else {
            setPasswordError(false);
        }
        return true;
    }

    const handleSignup = async () => {
        if (!canSubmit()) return;

        setIsLoading(true);
        setError('');

        try {
            const user = await signup({ email, password });
            createUser({ email, firebaseUid: user.uid }).then((data) => {
                if (data.error) {
                    setError(JSON.stringify(data.error));
                }
            });
            await sendEmailVerification(user);
        } catch (e) {
            setError(firebaseSignupErrorMessage(e.code));
        }

        setIsLoading(false);
    }

    return (
        <div className="authForm signUpForm">
            <div className="authForm__header">
                <h4>Fiók létrehozása</h4>
                <p className="description-text">Hozz létre új fiókot</p>
            </div>
            <div className="authForm__field__container">
                <div className="authForm__field__email">
                    <TextField
                        light={true}
                        error={emailError}
                        title="E-mail cím"
                        hint="Fiókhoz tartozó e-mail cím"
                        value={email} onChange={handleEmailChange}
                        suffixIcon={<HiOutlineMail />}
                    />
                </div>
                <div className="authForm__field__email">
                    <TextField
                        light={true}
                        error={passwordError}
                        title="Jelszó"
                        hint="Erős jelszó"
                        value={password}
                        onChange={handlePasswordChange}
                        suffixIcon={<RiLockPasswordLine />}
                        password={true}
                    />
                </div>
                <div className="authForm__field__password">
                    <TextField
                        light={true}
                        error={passwordConfirmationError}
                        title="Jelszó megerősítése"
                        hint="Erős jelszó mégegyszer"
                        value={passwordConfirmation}
                        onChange={handlePasswordConfirmationChange}
                        suffixIcon={<RiLockPasswordLine />}
                        password={true}
                    />
                </div>
            </div>
            <div className="authForm__primaryActions">
                <AsyncButton loading={loading} title="Regisztráció" onClick={() => handleSignup()}></AsyncButton>
            </div>
            {error && <p style={{ "color": "var(--red)", "textAlign": "center" }}>{error}</p>}
            <div className="authForm__secondaryActions">
                <p>Már van fiókod? </p>
                <TextButton color="var(--grey3)" title="Bejelentkezés" onClick={() => navigate("/auth/login")} />
            </div>
        </div>
    );
}