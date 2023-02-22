import { getAuth } from '@firebase/auth';
import React, { useContext, useEffect } from 'react'
import { AuthContext } from './context/authContext';

type AuthWrapperProps = {
    children: React.ReactNode;
}

function AuthWrapper(props: AuthWrapperProps) {
    const { setUser } = useContext(AuthContext);

    useEffect(() => {
        const auth = getAuth();

        const listener = auth.onAuthStateChanged((res) => {
            if (res) {
                if(res.emailVerified === false) {
                    return;
                }

                res.getIdToken().then((tokenRes) => {
                    setUser({ uid: res?.uid, token: tokenRes, email: res.email ?? '' });
                });

                return;
            }

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