import { getAuth } from '@firebase/auth';
import React, { useContext, useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom';
import { AuthContext } from '../features/auth/authContext';
import { useDispatch } from 'react-redux';
import { setToken } from '../features/auth/authSlice';

function AuthRedirect({ children }: any) {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        const auth = getAuth();

        const unsubscribe = auth.onAuthStateChanged((user) => {
            const path = window.location.pathname;

            if (user && !path.includes('/dashboard')) {
                user.getIdToken().then((token) => {
                    dispatch(setToken(token));
                    navigate('/dashboard/users');
                });
                return;
            }

            if (!user && path.includes('/dashboard')) {
                dispatch(setToken(null));
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