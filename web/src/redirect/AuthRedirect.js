import { getAuth } from 'firebase/auth';
import React, { useContext, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { AuthContext } from '../features/authentication/authContext';

function AuthRedirect() {
    const navigate = useNavigate();

    const path = window.location.pathname;

    const { user, updateUser } = useContext(AuthContext);

    useEffect(() => {
        const auth = getAuth();

        const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
            updateUser(firebaseUser);

            if (firebaseUser) {
                if (firebaseUser.emailVerified) {
                    if (!path.includes("/user")) {
                        navigate('/user/editor');
                    }
                    return;
                }

                navigate('/auth/verifyEmail');
                return;
            }

            if (path.includes("/user")) {
                navigate('/auth/login');
            } else if (path.includes("/auth/verifyEmail")) {
                navigate('/auth/login');
            }
        });

        return () => unsubscribe();
    }, []);

    if (user === undefined) return (<div></div>);

    return <Outlet></Outlet>
}

export default AuthRedirect;