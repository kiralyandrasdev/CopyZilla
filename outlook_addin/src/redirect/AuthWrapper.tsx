import { getAuth } from '@firebase/auth';
import React, { useContext, useEffect } from 'react'
import { AuthContext } from '../context/authContext';
import SignedOutView from '../views/SignedOutView';
import { AppContext, AppState } from '../context/appContext';

type AuthWrapperProps = {
    children: React.ReactNode;
}

function AuthWrapper(props: AuthWrapperProps) {
    const { appState, setAppState } = useContext(AppContext);
    const { setUser } = useContext(AuthContext);

    useEffect(() => {
        const auth = getAuth();

        const listener = auth.onAuthStateChanged((res) => {
            if (res) {
                if (res.emailVerified === false) {
                    setAppState(AppState.EmailNotVerified);
                    return;
                }

                res.getIdToken().then((tokenRes) => {
                    setUser({ uid: res?.uid, token: tokenRes, email: res.email ?? '' });
                });

                setAppState(AppState.SignedIn);

                return;
            }

            setAppState(AppState.SignedOut);
            setUser(null);
        });

        return () => {
            listener();
        }
    }, []);

    return (
        <div>
            {props.children}
        </div>
    );
}

export default AuthWrapper;