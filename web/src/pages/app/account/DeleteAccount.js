import React, { useState, useContext, useEffect } from 'react';
import { FiKey } from 'react-icons/fi';
import { AsyncButton, TextField } from '../../../components';
import EmailSvg from '../../../assets/email.svg';
import './DeleteAccount.css';
import { useDeleteUserMutation } from '../../../features/api/apiSlice';
import { UserContext } from '../../../features';
import { logout, reauthenticateWithPassword, tryReauthenticationWithPassword } from '../../../features/authentication/actions/authActions';

function DeleteAccountPage() {
    const { user } = useContext(UserContext)
    const [deleteUser,
        {
            isLoading: isDeleting,
            isSuccess: isDeleteSuccess,
            isError: isDeleteError,
            error: deleteError
        }
    ] = useDeleteUserMutation();

    const [error, setError] = useState("");

    const [password, setPassword] = useState("");
    const [confirmation, setConfirmation] = useState("");

    const [passwordError, setPasswordError] = useState(false);
    const [confirmationError, setConfirmationError] = useState(false);

    useEffect(() => {
        if (isDeleteError) {
            setError(deleteError);
        }
        if (isDeleteSuccess) {
            setPassword("");
            setTimeout(() => {
                logout();
            }, 5000);
        }
    }, [isDeleteError, deleteError, isDeleteSuccess]);

    const canSubmit = () => {
        if (password.length === 0) {
            setPasswordError(true);
            setError("Password is required");
            return false;
        } else {
            setPasswordError(false);
            setError("");
        }

        if (confirmation.length === 0 || !(confirmation.toLowerCase() === "yes")) {
            setConfirmationError(true);
            setError("Confirmation is required");
            return false;
        } else {
            setConfirmationError(false);
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

        deleteUser({ userId: user.id });
    }

    return (
        <div className="page page__changeEmail page__centerContent">
            <img className="illustration__100" src={EmailSvg}></img>
            <div className="changeEmail__heading">
                <h5>Delete account</h5>
                <p>Are you sure you want to delete your account?</p>
            </div>
            <p className="description">Please type "yes" to confirm</p>
            <div className="deleteAccount__form">
                <TextField
                    password={true}
                    error={passwordError}
                    suffixIcon={<FiKey />}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    hint="Password"
                />
                <TextField
                    error={confirmationError}
                    suffixIcon={<FiKey />}
                    value={confirmation}
                    onChange={(e) => setConfirmation(e.target.value)}
                    hint="'yes'"
                />
                <div className="deleteAccount__form__actions">
                    <AsyncButton loading={isDeleting} title="Delete account" onClick={() => handleSubmit()}></AsyncButton>
                </div>
            </div>
            {error && <p className="red">{error}</p>}
            {isDeleteSuccess && <>Your account has been deleted. You will be logged out shortly.</>}
        </div>
    );
}

export default DeleteAccountPage;