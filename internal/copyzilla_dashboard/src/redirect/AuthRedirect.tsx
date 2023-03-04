import { getAuth } from '@firebase/auth';
import React, { useContext, useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom';
import { AuthContext } from '../features/auth/authContext';

function AuthRedirect({ children }: any) {
    const navigate = useNavigate();

    useEffect(() => {
        const auth = getAuth();

        const unsubscribe = auth.onAuthStateChanged((user) => {
            const path = window.location.pathname;

            if (user && !path.includes('/dashboard')) {
                console.log("redirecting to dashboard");
                navigate('/dashboard/users');
                return;
            }

            if (!user && path.includes('/dashboard')) {
                console.log("redirecting to login");
                navigate('/login');
                return;
            }
        });

        return () => {
            unsubscribe();
        }
    });

    return <Outlet />
}

export default AuthRedirect;