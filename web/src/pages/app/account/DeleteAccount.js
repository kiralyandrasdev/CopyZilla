import React, { useState, useContext } from 'react';
import { FiKey } from 'react-icons/fi';
import { AsyncButton, TextField } from '../../../components';
import EmailSvg from '../../../assets/email.svg';
import './ChangeEmail.css';
import { useDeleteUserMutation } from '../../../features/api/apiSlice';
import { UserContext } from '../../../features';
import { logout, tryReauthenticationWithPassword } from '../../../features/authentication/actions/authActions';

function DeleteAccountPage() {
    const {user} = useContext(UserContext)
    const [deleteUser] = useDeleteUserMutation();

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");

    const [password, setPassword] = useState("");
    const [confirmation, setConfirmation] = useState("");

    const [passwordError, setPasswordError] = useState(false);
    const [confirmationError, setConfirmationError] = useState(false);

    const canSubmit = () => {

        if (password.length === 0) {
            setPasswordError(true);
            setError("A jelszó megadása kötelező!");
            return false;
        } else {
            setPasswordError(false);
            setError("");
        }
        
        if (!tryReauthenticationWithPassword({password})) {
            setPasswordError(true);
            setError("A jelszó nem megfelelő!");
            return false;
        } else {
            setPasswordError(false);
            setError("");
        }

        if (confirmation.length === 0 || !(confirmation.toLowerCase() === "igen")) {
            setConfirmationError(true);
            setError("A megerősítés kötelező!");
            return false;
        } else {
            setConfirmationError(false);
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
            deleteUser({userId:user.id});
            await logout();
        } catch (error) {
            console.log(error.code);
            setError(error.code);
            console.log(error);
        }

        setIsLoading(false);
    }

    return (
        <div className="page page__changeEmail page__centerContent">
            <img className="illustration__100" src={EmailSvg}></img>
            <div className="changeEmail__heading">
                <h5>Felhasználó törlése</h5>
                <p>
                    <span style={{color: "red"}}>FONTOS: </span>
                    <span>A művelet nem visszafordítható. Biztos vagy benne, hogy törölni akarod a felhasználód?</span>
                </p> 
                <p>Amennyiben igen, kérlek add meg a jelszavad és erősítsd meg a döntésed az "Igen" szó leírásával.</p>
            </div>
            <div className="deleteAccount__form">
                <TextField password={true} error={passwordError} suffixIcon={<FiKey />} value={password} onChange={(e) => setPassword(e.target.value)} hint="Jelszó"></TextField>
                <TextField error={confirmationError} suffixIcon={<FiKey />} value={confirmation} onChange={(e) => setConfirmation(e.target.value)} hint="'Igen'"></TextField>
                <div className="deleteAccount__form__actions">
                    <AsyncButton loading={isLoading} title="Felhasználó törlése" onClick={() => handleSubmit()}></AsyncButton>
                </div>
            </div>
            {error && <p className="red">{error}</p>}
            {message && <p className="message" style={{color: "green"}}>{message}</p>}
        </div>
    );
}

export default DeleteAccountPage;