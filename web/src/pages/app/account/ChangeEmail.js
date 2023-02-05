import React, { useRef, useState } from 'react';
import { FiKey, FiMail } from 'react-icons/fi';
import { useSelector } from 'react-redux';
import EmailSvg from '../../../assets/email.svg';
import { AsyncButton, TextField } from '../../../components';
import { updateEmailWithReauth } from '../../../features/authentication/actions/authActions';
import { firebaseUpdateEmailErrorMessage } from '../../../features/authentication/utils/authUtils';
import './ChangeEmail.css';

function ChangeEmailPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");

    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");

    const [passwordError, setPasswordError] = useState(false);
    const [emailError, setEmailError] = useState(false);

    const { firebaseUid } = useSelector((state) => state.auth);

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

        setIsLoading(true);
        setError("");
        setMessage("");

        try {
            await updateEmailWithReauth({ password, email });
            setMessage("Sikeresen megváltoztattad az e-mail címedet. Ne felejtsd el visszaigazolni az új címedet!");
        } catch (error) {
            setError(firebaseUpdateEmailErrorMessage(error.code));
            console.log(error);
        }

        setIsLoading(false);
    }

    return (
        <div className="page page__changeEmail page__centerContent">
            <img className="illustration__100" src={EmailSvg}></img>
            <div className="changeEmail__heading">
                <h5>E-mail cím megváltoztatása</h5>
                <p className="description">A módosítást követően ellenőrző linket küldünk az új e-mail címedre</p>
            </div>
            <div className="changeEmail__form">
                <TextField password={true} error={passwordError} suffixIcon={<FiKey />} value={password} onChange={(e) => setPassword(e.target.value)} hint="Jelszó"></TextField>
                <TextField error={emailError} suffixIcon={<FiMail />} value={email} onChange={(e) => setEmail(e.target.value)} hint="Új e-mail cím"></TextField>
                <div className="changeEmail__form__actions">
                    <AsyncButton loading={isLoading} title="Megerősítő levél küldése" onClick={() => handleSubmit()}></AsyncButton>
                </div>
            </div>
            {error && <p className="red">{error}</p>}
            {message && <p className="message">{message}</p>}
        </div>
    );
}

export default ChangeEmailPage;