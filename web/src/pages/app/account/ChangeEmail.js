import React, { useContext, useEffect, useState } from 'react';
import { FiKey, FiMail } from 'react-icons/fi';
import EmailSvg from '../../../assets/email.svg';
import { AsyncButton, TextField } from '../../../components';
import { useUpdateUserMutation } from '../../../features/api/apiSlice';
import { UserContext } from '../../../features';
import './ChangeEmail.css';
import { logout, reauthenticateWithPassword } from '../../../features/authentication/actions/authActions';

function ChangeEmailPage() {
    const { user } = useContext(UserContext)

    const [updateUser,
        {
            isLoading: isUpdating,
            isSuccess: isUpdateSuccess,
            isError: isUpdateError,
            error: updateError
        }] = useUpdateUserMutation();

    const [error, setError] = useState("");

    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");

    const [passwordError, setPasswordError] = useState(false);
    const [emailError, setEmailError] = useState(false);

    useEffect(() => {
        if (isUpdateError) {
            setError(updateError);
        }
        if (isUpdateSuccess) {
            setPassword("");
            setEmail("");
            setTimeout(() => {
                logout();
            }, 5000);
        }
    }, [isUpdateError, updateError, isUpdateSuccess]);

    const canSubmit = () => {
        if (password.length === 0) {
            setPasswordError(true);
            setError("Password is required");
            return false;
        } else {
            setPasswordError(false);
            setError("");
        }

        if (email.length === 0) {
            setEmailError(true);
            setError("Email address is required");
            return false;
        } else {
            setEmailError(false);
            setError("");
        }

        return true;
    }

    const handleSubmit = async () => {
        if (!canSubmit()) return;

        try {
            await reauthenticateWithPassword({ password });
        } catch (error) {
            setError(error.code);
            return;
        }

        updateUser({ userId: user.id, user: { ...user, email: email } });
    }

    return (
        <div className="page page__changeEmail page__centerContent">
            <img className="illustration__100" src={EmailSvg}></img>
            <div className="changeEmail__heading">
                <h5>Update email address</h5>
                <p className="description">After changing your email address, you will be logged out of your account.</p>
            </div>
            <div className="changeEmail__form">
                <TextField
                    hint="Password"
                    password={true}
                    error={passwordError}
                    suffixIcon={<FiKey />}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <TextField
                    error={emailError}
                    suffixIcon={<FiMail />}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    hint="New email address"
                />
                <div className="changeEmail__form__actions">
                    <AsyncButton loading={isUpdating} title="Update email address" onClick={() => handleSubmit()}></AsyncButton>
                </div>
            </div>
            {error && <p className="red">{error}</p>}
            {isUpdateSuccess && <p>Your email address has been changed. You will be logged out shortly.</p>}
        </div>
    );
}

export default ChangeEmailPage;