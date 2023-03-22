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
import { websiteUrl } from '../../../config/envConfig';
import "./AuthForm.css";
import Checkbox from "../../../components/ui/Checkbox";

export default function SignupForm() {
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(false);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setConfirmationPassword] = useState('');
    const [agreeToTerms, setAgreeToTerms] = useState(true);

    const [error, setError] = useState('');
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [passwordConfirmationError, setPasswordConfirmationError] = useState(false);
    const [termsError, setTermsError] = useState(false);

    function handleEmailChange(event) {
        setEmail(event.target.value);
    };

    function handlePasswordChange(event) {
        setPassword(event.target.value);
    };

    function handlePasswordConfirmationChange(event) {
        setConfirmationPassword(event.target.value);
    };

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
            setError("Email address is required");
            setEmailError(true);
            return false;
        } else {
            setEmailError(false);
        }
        if (password.length === 0) {
            setError("Password is required");
            setPasswordError(true);
            return false;
        } else {
            setPasswordError(false);
        }
        if (passwordConfirmation.length === 0) {
            setError("Password confirmation is required");
            setPasswordConfirmationError(true);
            return false;
        } else {
            setPasswordConfirmationError(false);
        }
        if (password !== passwordConfirmation) {
            setError("Passwords do not match");
            setPasswordConfirmationError(true);
            return false;
        } else {
            setPasswordError(false);
        }
        if (!agreeToTerms) {
            setError("You must agree to the terms of service");
            setTermsError(true);
            return false;
        } else {
            setTermsError(false);
        }

        return true;
    }

    window.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            handleSignup();
        }
    });

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
            const loginUrl = `${websiteUrl}/auth/login`;
            await sendEmailVerification(user, { url: loginUrl });
        } catch (e) {
            console.log(e);
            setError(e.code);
        }

        setIsLoading(false);
    }

    return (
        <div className="authForm signUpForm">
            <div className="authForm__header">
                <h4>Create a new account</h4>
            </div>
            <div className="authForm__field__container">
                <div className="authForm__field__email">
                    <TextField
                        error={emailError}
                        hint="Email address"
                        value={email} onChange={handleEmailChange}
                        suffixIcon={<HiOutlineMail />}
                    />
                </div>
                <div className="authForm__field__email">
                    <TextField
                        error={passwordError}
                        hint="Password"
                        value={password}
                        onChange={handlePasswordChange}
                        suffixIcon={<RiLockPasswordLine />}
                        password={true}
                    />
                </div>
                <div className="authForm__field__password">
                    <TextField
                        error={passwordConfirmationError}
                        hint="Confirm password"
                        value={passwordConfirmation}
                        onChange={handlePasswordConfirmationChange}
                        suffixIcon={<RiLockPasswordLine />}
                        password={true}
                    />
                </div>
            </div>
            {/* <div className="authForm__agreeToTerms">
                <Checkbox
                    checked={agreeToTerms}
                    onChange={() => setAgreeToTerms(!agreeToTerms)}
                    error={termsError}
                />
                <p>I agree to the <a href="/termsOfService" target="_blank">terms of service</a></p>
            </div> */}
            <div className="authForm__primaryActions">
                <AsyncButton loading={loading} title="Create account" onClick={() => handleSignup()}></AsyncButton>
            </div>
            {error && <p style={{ "color": "var(--red)", "textAlign": "center" }}>{error}</p>}
            <div className="authForm__secondaryActions description">
                <p className="description">Already have an account?</p>
                <TextButton color="white" title="Sign in" onClick={() => navigate("/auth/login")} />
            </div>
            <p className="description authCaption">
                By creating an account, you agree to our <a className="authCaption" href="/termsOfService" target="_blank">Terms of Service</a> and <a className="authCaption" href="/privacyPolicy" target="_blank">Privacy Policy</a>.
            </p>
        </div>
    );
}