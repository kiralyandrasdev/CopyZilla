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

    window.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            handleLogin();
        }
    });

    const canSubmit = () => {
        if(email.length < 1) {
            setError("Email address is required");
            return false;
        } else {
            setError("");
        }
        if(password.length < 1) {
            setError("Password is required");
            return false;
        } else {
            setError("");
        }
        return true;
    }

    const handleLogin = async () => {
        if(!canSubmit()) return;

        setIsLoading(true);

        try {
            const auth = getAuth();

            await signInWithEmailAndPassword(auth, email, password).then((res) => {
                if (!res.user.emailVerified) {
                    setError("Email address is not verified");
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
                placeholder="Email address"
                suffixIcon={<FiMail />}
            />
            <InputField
                value={password}
                onChange={handlePasswordChange}
                placeholder="Password"
                suffixIcon={<FiKey />}
                obscure={true}
            />
            <PrimaryButton
                title="Sign in"
                isLoading={isLoading}
                enabled={true}
                onClick={() => handleLogin()}
            />
            {error && <p className="red">{error}</p>}
        </div>
    );
}

export default LoginForm;