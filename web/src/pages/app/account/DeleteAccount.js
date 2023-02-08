import React, { useRef, useState, useContext } from 'react';
import { FiKey, FiMail } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { AsyncButton, TextField } from '../../../components';
import EmailSvg from '../../../assets/email.svg';
import { deleteAccountWithReauth } from '../../../features/authentication/actions/authActions';
import './ChangeEmail.css';
import { useDeleteUserMutation } from '../../../features/api/apiSlice';
import { UserContext } from '../../../features';

function DeleteAccountPage() {
    const dispatch = useDispatch();
    const {user} = useContext(UserContext)
    const [
        deleteUser,
        {
            isLoading: userDeleteLoading,
            error: userDeleteError,
            data: userDeleteUser,
            isSuccess: userApiDeleteSuccess,
        }
    ] = useDeleteUserMutation();

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
            await deleteAccountWithReauth({password});
            deleteUser({userId:user.id});
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