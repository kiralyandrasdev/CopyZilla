import React, { useState } from 'react';
import { FiKey } from 'react-icons/fi';
import PasswordSvg from '../../../assets/password.svg';
import './ChangePassword.css';
import { AsyncButton, TextField } from '../../../components';
import { changePassword, reauthenticateWithPassword } from '../../../features/authentication/actions/authActions';

function ChangePasswordPage() {
    const [password, setPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");

    const [passwordError, setPasswordError] = useState(false);
    const [newPasswordError, setNewPasswordError] = useState(false);

    const [success, setSuccess] = useState(false);

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const canSubmit = () => {
        if (password.length === 0) {
            setError("Current password is required");
            setPasswordError(true);
            return false;
        } else {
            setPasswordError(false);
            setError("");
        }
        if (newPassword.length === 0) {
            setError("New password is required");
            setNewPasswordError(true);
            return false;
        } else {
            setNewPasswordError(false);
            setError("");
        }
        return true;
    }

    const onSubmit = async () => {
        if (!canSubmit()) return;

        setLoading(true);

        try {
            await reauthenticateWithPassword({ password });
            await changePassword({ newPassword });
        } catch (error) {
            setError(error.code);
            setLoading(false);
            return;
        }

        setPassword("");
        setNewPassword("");

        setLoading(false);
        setSuccess(true);
    }

    return (
        <div className="page page__changePassword page__centerContent">
            <img className="illustration__100" src={PasswordSvg}></img>
            <h5>Update password</h5>
            <div className="changePassword__form">
                <TextField
                    password={true}
                    error={passwordError}
                    suffixIcon={<FiKey />}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    hint="Current password"
                />
                <TextField
                    password={true}
                    error={newPasswordError}
                    suffixIcon={<FiKey />}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    hint="New password"
                />
                <div className="changePassword__form__actions">
                    <AsyncButton loading={loading} title="Update password" onClick={() => onSubmit()}></AsyncButton>
                </div>
            </div>
            {error && <p className="red">{error}</p>}
            {success && <p>You have successfully changed your password</p>}
        </div>
    );
}

export default ChangePasswordPage;