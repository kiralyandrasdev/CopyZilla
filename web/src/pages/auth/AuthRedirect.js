import { getAuth, sendEmailVerification } from 'firebase/auth';
import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

function AuthRedirect() {
    const navigate = useNavigate();

    useEffect(() => {
        const auth = getAuth();

        const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
            if (firebaseUser) {
                if (firebaseUser.emailVerified) {
                    navigate('/user/editor');
                } else {
                    sendEmailVerification(firebaseUser);
                    navigate('/auth/verifyEmail');
                }
            } else {
                navigate('/auth/login');
            }
        });

        return () => unsubscribe();
    }, []);

    return <Outlet></Outlet>
}

export default AuthRedirect;