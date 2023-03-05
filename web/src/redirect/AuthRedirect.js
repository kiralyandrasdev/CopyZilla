import { getAuth } from 'firebase/auth';
import React, { useContext, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import { LoadingIndicator } from '../components';
import { AuthContext } from '../features/authentication/authContext';
import { setAccessToken, setEmail as setEmail } from '../features/authentication/authSlice';
import styles from './AuthRedirect.module.css';

function AuthRedirect() {
    const navigate = useNavigate();

    const { user, updateUser } = useContext(AuthContext);
    const dispatch = useDispatch();

    useEffect(() => {
        const auth = getAuth();

        const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
            const path = window.location.pathname;

            updateUser(firebaseUser);

            if (firebaseUser) {
                if (firebaseUser.accessToken) {
                    dispatch(setAccessToken(firebaseUser.accessToken));
                    dispatch(setEmail(firebaseUser.email));
                }

                if (firebaseUser.emailVerified) {
                    if (!path.includes("/user")) {
                        navigate('/user/home');
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