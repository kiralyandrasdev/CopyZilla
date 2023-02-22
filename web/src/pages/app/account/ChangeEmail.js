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
        if(isUpdateSuccess) {
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
            setError("A jelszó megadása kötelező!");
            return false;
        } else {
            setPasswordError(false);
            setError("");
        }

        if (email.length === 0) {
            setEmailError(true);
            setError("Az új e-mail cím megadása kötelező!");
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
                <h5>E-mail cím megváltoztatása</h5>
                <p className="description">A módosítást követően újra be kell majd jelentkezned.</p>
            </div>
            <div className="changeEmail__form">
                <TextField password={true} error={passwordError} suffixIcon={<FiKey />} value={password} onChange={(e) => setPassword(e.target.value)} hint="Jelszó"></TextField>
                <TextField error={emailError} suffixIcon={<FiMail />} value={email} onChange={(e) => setEmail(e.target.value)} hint="Új e-mail cím"></TextField>
                <div className="changeEmail__form__actions">
                    <AsyncButton loading={isUpdating} title="E-mail cím megváltoztatása" onClick={() => handleSubmit()}></AsyncButton>
                </div>
            </div>
            {error && <p className="red">{error}</p>}
            {isUpdateSuccess && <p>Sikeresen megváltoztattad az e-mail címed! Hamarosan kijelentkeztetünk a fiókodból.</p>}
        </div>
    );
}

export default ChangeEmailPage;