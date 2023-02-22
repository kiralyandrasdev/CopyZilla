import React, { useContext, useState } from 'react'
import InputField from '../../components/InputField'
import { FiKey, FiMail } from "react-icons/fi";
import PrimaryButton from '../../components/PrimaryButton';
import { getAuth, signInWithEmailAndPassword } from '@firebase/auth';
import { FirebaseError } from '@firebase/util';
import '../../components/styles/Form.css';
import { AuthContext } from '../../context/authContext';

function LoginForm() {
    const { setUser } = useContext(AuthContext);

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");

    const handleEmailChange = (e: string) => {
        setEmail(e);
    }

    const handlePasswordChange = (e: string) => {
        setPassword(e);
    }

    const handleLogin = async () => {
        setIsLoading(true);

        try {
            const auth = getAuth();

            await signInWithEmailAndPassword(auth, email, password).then((res) => {
                if (!res.user.emailVerified) {
                    setError("E-mail cím nincs megerősítve!");
                    setIsLoading(false);
                    
                }
            });
        } catch (e) {
            if (e instanceof FirebaseError) {
                setError(e.code);
            } else {
                setError(JSON.stringify(e));
            }
        }

        setIsLoading(false);
    }

    return (
        <div className="form form__login">
            <InputField
                value={email}
                onChange={handleEmailChange}
                placeholder="E-mail cím"
                suffixIcon={<FiMail />}
            />
            <InputField
                value={password}
                onChange={handlePasswordChange}
                placeholder="Jelszó"
                suffixIcon={<FiKey />}
            />
            <PrimaryButton
                title="Bejelentkezés"
                isLoading={isLoading}
                enabled={true}
                onClick={() => handleLogin()}
            />
            {error && <p className="red">{error}</p>}
        </div>
    );
}

export default LoginForm;