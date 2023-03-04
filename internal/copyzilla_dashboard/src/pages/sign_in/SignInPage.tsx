import React, { useEffect, useState } from 'react'
import styles from './SignInPage.module.css';
import InputField from '../../components/InputField';
import TextButton from '../../components/TextButton';
import { getAuth, signInWithEmailAndPassword } from '@firebase/auth';

function SignInPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);

    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const signIn = async () => {
        if(!fieldsValid()) return;

        setLoading(true);
        setErrorMessage("");

        try {
            const auth = getAuth();
            await signInWithEmailAndPassword(auth, email, password);
        } catch (e: any) {
            setErrorMessage(e.code);
        }

        setLoading(false);
    }

    const fieldsValid = () => {
        if (email.length === 0) {
            setEmailError(true);
            return false;
        } else {
            setEmailError(false);
        }

        if (password.length === 0) {
            setPasswordError(true);
            return false;
        } else {
            setPasswordError(false);
        }

        return true;
    }

    window.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            signIn();
        }
    });

    return (
        <div className={styles.page}>
            <h5>Sign In</h5>
            <InputField
                value={email}
                onChange={setEmail}
                hint="Email address"
                error={emailError}
                disabled={loading}
            />
            <InputField
                value={password}
                onChange={setPassword}
                hint="Password"
                error={passwordError}
                disabled={loading}
                obscure={true}
            />
            <TextButton
                text="Sign In"
                onClick={() => signIn()}
                isLoading={loading}
            />
            {errorMessage.length > 0 && <div className={styles.error}>{errorMessage}</div>}
        </div>
    );
}

export default SignInPage;