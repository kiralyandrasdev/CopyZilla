import { getAuth } from '@firebase/auth';
import React, { useContext, useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom';
import { AuthContext } from '../features/auth/authContext';
import { useDispatch } from 'react-redux';
import { setToken } from '../features/auth/authSlice';
import LoadingIndicator from '../components/LoadingIndicator';

function AuthRedirect({ children }: any) {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { user, setUser } = useContext(AuthContext);

    useEffect(() => {
        const auth = getAuth();

        const unsubscribe = auth.onAuthStateChanged((user) => {
            const path = window.location.pathname;

            if (user) {
                const token = (user as any).accessToken;
                dispatch(setToken(token));
                setUser(user);

                if (!path.includes('/dashboard')) {
                    navigate('/dashboard/users');
                }

                return;
            }

            if (path.includes('/dashboard')) {
                navigate('/login');
            }
        });

        return () => {
            unsubscribe();
        }
    });

    const currentPath = window.location.pathname;

    if (user == null && currentPath.includes("/dashboard")) {
        return (
            <div>
                <LoadingIndicator />
            </div>
        );
    }

    return <Outlet />
}

export default AuthRedirect;