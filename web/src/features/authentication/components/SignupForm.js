import React, { useCallback, useEffect, useState } from "react";
import { HiOutlineMail } from "react-icons/hi";
import { RiLockPasswordLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AsyncButton, TextButton, TextField } from "../../../components";
import { useCreateUserMutation } from "../../api/apiSlice";
import { createFirebaseUser } from "../actions/authActions";
import { resetAuthError } from "../authSlice";
import "./AuthForm.css";

export default function SignupForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setConfirmationPassword] = useState('');

    const [emailErrorMessage, setEmailErrorMessage] = useState('');
    const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
    const [passwordConfirmationErrorMessage, setPasswordConfirmationErrorMessage] = useState('');

    const {
        accessToken,
        loading: firebaseCreateLoading,
        error: firebaseCreateError
    } = useSelector((state) => state.auth)

    const [
        createUser,
        {
            isLoading: userCreateLoading,
            error: userCreateError,
            data: userCreateUser
        }
    ] = useCreateUserMutation();

    const error = firebaseCreateError || userCreateError;
    const loading = firebaseCreateLoading || userCreateLoading;

    useEffect(() => {
        console.log("accessToken", accessToken);
        console.log("userCreateUser", userCreateUser);
        if (accessToken && userCreateUser) {
            routeChange("/auth/verifyEmail");
        }
    }, [accessToken, userCreateUser]);

    const dispatch = useDispatch();

    function handleEmailChange(event) {
        setEmail(event.target.value);
    };

    function handlePasswordChange(event) {
        setPassword(event.target.value);
    };

    function handlePasswordConfirmationChange(event) {
        setConfirmationPassword(event.target.value);
    };

    const updateEmailErrorMessage = (value) => {
        setEmailErrorMessage(value);
    }

    const updatePasswordErrorMessage = (value) => {
        setPasswordErrorMessage(value);
    }

    const updatePasswordConfirmationErrorMessage = (value) => {
        setPasswordConfirmationErrorMessage(value);
    }

    let navigate = useNavigate();
    const routeChange = (path) => {
        navigate(path);
    }

    const handleSignup = () => {
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
        if (passwordConfirmation == '') {
            updatePasswordConfirmationErrorMessage('Jelszó megerősítése kötelező');
            return;
        } else {
            updatePasswordConfirmationErrorMessage('');
        }
        if (password !== passwordConfirmation) {
            updatePasswordConfirmationErrorMessage('A jelszavak nem egyeznek');
            return;
        } else {
            updatePasswordConfirmationErrorMessage('');
        }
        dispatch(createFirebaseUser({ email, password }))
            .then((res) => {
                if (res.type == "auth/createUser/fulfilled") {
                    createUser({ email: email, firebaseUid: res.payload.firebaseUid })
                }
            });
    }

    const authErrorMessage = useCallback(() => {
        if (emailErrorMessage) return emailErrorMessage;
        if (passwordErrorMessage) return passwordErrorMessage;
        if (passwordConfirmationErrorMessage) return passwordConfirmationErrorMessage;
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
        if (error == "auth/email-already-in-use") {
            return "Ez az e-mail cím már használatban van";
        }
        if (error == "auth/weak-password") {
            return "A jelszónak minimum 8 karaktert kell tartalmaznia"
        }
        if (error == "auth/network-request-failed") {
            return "Hálózati hiba";
        }
        return error;
    }, [emailErrorMessage, passwordErrorMessage, passwordConfirmationErrorMessage, error]);

    return (
        <div className="authForm signUpForm">
            <div className="authForm__header">
                <h4>Fiók létrehozása</h4>
                <p className="description-text">Hozz létre új fiókot</p>
            </div>
            <div className="authForm__field__container">
                <div className="authForm__field__email">
                    <TextField light={true} error={emailErrorMessage} title="E-mail cím" hint="Fiókhoz tartozó e-mail cím" value={email} onChange={handleEmailChange} suffixIcon={<HiOutlineMail />}></TextField>
                </div>
                <div className="authForm__field__email">
                    <TextField light={true} error={passwordErrorMessage} title="Jelszó" hint="Erős jelszó" value={password} onChange={handlePasswordChange} suffixIcon={<RiLockPasswordLine />} password={true}></TextField>
                </div>
                <div className="authForm__field__password">
                    <TextField light={true} error={passwordConfirmationErrorMessage} title="Jelszó megerősítése" hint="Erős jelszó mégegyszer" value={passwordConfirmation} onChange={handlePasswordConfirmationChange} suffixIcon={<RiLockPasswordLine />} password={true}></TextField>
                </div>
            </div>
            <div className="authForm__primaryActions">
                <AsyncButton loading={loading} title="Regisztráció" onClick={() => handleSignup()}></AsyncButton>
            </div>
            {authErrorMessage() ? <p style={{ "color": "var(--red)", "textAlign": "center" }}>{authErrorMessage()}</p> : null}
            <div className="authForm__secondaryActions">
                <p>Már van fiókod? </p>
                <TextButton color="var(--grey3)" title="Bejelentkezés" onClick={() => routeChange("/auth/login")} />
            </div>
        </div>
    );
}