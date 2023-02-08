import { getAuth } from 'firebase/auth';
import React, { useContext, useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { LoadingIndicator } from '../components';
import { AppContext } from '../context/appContext';
import { AuthContext } from '../features/authentication/authContext';
import styles from './AuthRedirect.module.css';

function AuthRedirect() {
    const navigate = useNavigate();

    const { user, updateUser } = useContext(AuthContext);
    const { preventAuthRedirect } = useContext(AppContext);

    useEffect(() => {
        const auth = getAuth();

        const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
            const path = window.location.pathname;

            console.log("Auth state changed: " + firebaseUser);

            updateUser(firebaseUser);

            if (preventAuthRedirect) return;

            if (firebaseUser) {
                if (firebaseUser.emailVerified) {
                    if (!path.includes("/user")) {
                        navigate('/user/editor');
                    }
                    return;
                }

                if (!path.includes("/auth/verifyEmail")) {
                    navigate('/auth/verifyEmail');
                }

                return;
            }

            if (path.includes("/user")) {
                navigate('/auth/login');
            } else if (path.includes("/auth/verifyEmail")) {
                navigate('/auth/login');
            }
        });

        return () => unsubscribe();
    });

    const currentPath = window.location.pathname;

    if (user == null && currentPath.includes("/user")) {
        return (
            <div className={styles.authRedirect}>
                <div className={styles.authRedirect__content}>
                    <LoadingIndicator color="white"></LoadingIndicator>
                </div>
            </div>
        );
    }

    return <Outlet></Outlet>
}

export default AuthRedirect;