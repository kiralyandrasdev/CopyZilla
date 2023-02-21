import { getAuth, signInWithCredential, signInWithCustomToken, signOut } from '@firebase/auth';
import React, { useContext, useEffect } from 'react'
import { AuthContext } from './context/authContext';

type AuthWrapperProps = {
    children: React.ReactNode;
}

function AuthWrapper(props: AuthWrapperProps) {
    const { user, setUser } = useContext(AuthContext);

    useEffect(() => {
        const auth = getAuth();

        const cachedToken = localStorage.getItem('copyzilla_token');
        console.log('cachedToken', cachedToken);

        chrome.storage.sync.get(['copyzilla_token'], (res) => {
            console.log('chrome.storage.sync.get', res);
        });

        const listener = auth.onAuthStateChanged((res) => {
            if (res) {
                if(!cachedToken) {
                    signOut(auth);
                    return;
                }

                console.log('User is signed in.');

                res.getIdToken().then((tokenRes) => {
                    setUser({ uid: res?.uid, token: tokenRes, email: res.email ?? '' });
                    localStorage.setItem('copyzilla_token', tokenRes);
                    console.log('Token acquired');
                });

                return;
            }

            setUser(null);
            console.log('User is not signed in.');

            if (cachedToken) {
                console.log('Signing in with cached token');
                signInWithCustomToken(auth, cachedToken);
            }
        });

        return () => {
            listener();
        }
    });

    return (
        <div>
            {props.children}
        </div>
    );
}

export default AuthWrapper;