import React, { useCallback, useEffect, useState } from "react";
import { HiOutlineMail } from "react-icons/hi";
import { RiLockPasswordLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AsyncButton, TextButton, TextField } from "../../../components";
// import { useCreateUserMutation } from "../../api/apiSlice";
import { createUser } from "../../user/actions/userActions";
import { createFirebaseUser } from "../actions/authActions";
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
        firebaseUid,
        loading: firebaseCreateLoading,
        error: firebaseCreateError
    } = useSelector((state) => state.auth)

    /*     const [
            createUser,
            {
                isLoading: userCreateLoading,
                error: userCreateError,
                isSuccess: userCreateSuccess,
            }
        ] = useCreateUserMutation(); */

    const {
        isLoading: userCreateLoading,
        error: userCreateError,
        user: userCreateUser
    } = useSelector(state => state.user);

    const error = firebaseCreateError || userCreateError;
    const loading = firebaseCreateLoading || userCreateLoading;

    useEffect(() => {
        if (accessToken && userCreateUser) {
            routeChange("/user/editor");
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
                console.log("Firebase create result: ", res);
                if (res.type == "auth/createUser/fulfilled") {
                    dispatch(createUser({ email: email, firebaseUid: res.payload.firebaseUid }))
                        .then((apiRes) => {
                            if (apiRes.type == "user/createUser/fulfilled") {
                                routeChange("/user/editor");
                            }
                        })
                }
            })
            .catch((err) => {
                console.log("User create error: ", err);
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
            return "A jelszó minimum 8 karakter hosszú kell legyen."
        }
        if (error == "auth/network-request-failed") {
            return "Hálózati hiba";
        }
        return error;
    });

    return (
        <div className="auth-form">
            <h4>Új fiók létrehozása</h4>
            <p className="description-text">Hozz létre új fiókot</p>
            <div className="auth-form-input">
                <div className="auth-field">
                    <TextField error={emailErrorMessage} title="E-mail cím" hint="Fiókhoz tartozó e-mail cím" value={email} onChange={handleEmailChange} suffixIcon={<HiOutlineMail />}></TextField>
                </div>
                <div className="auth-field">
                    <TextField error={passwordErrorMessage} title="Jelszó" hint="Erős jelszó" value={password} onChange={handlePasswordChange} suffixIcon={<RiLockPasswordLine />} password={true}></TextField>
                </div>
                <div className="auth-field">
                    <TextField error={passwordConfirmationErrorMessage} title="Jelszó megerősítése" hint="Erős jelszó mégegyszer" value={passwordConfirmation} onChange={handlePasswordConfirmationChange} suffixIcon={<RiLockPasswordLine />} password={true}></TextField>
                </div>
            </div>
            <div id="auth-button">
                <AsyncButton loading={loading} title="Regisztráció" onClick={() => handleSignup()}></AsyncButton>
            </div>
            {authErrorMessage() ? <p style={{ 'color': 'red', 'margin': '20px 0px 0px 0px' }}>{authErrorMessage()}</p> : null}
            <div className="auth-type-switch-container">
                <p>Már van fiókod? </p>
                <TextButton title="Bejelentkezés" onClick={() => routeChange("/auth/login")} />
            </div>
        </div>
    );
}