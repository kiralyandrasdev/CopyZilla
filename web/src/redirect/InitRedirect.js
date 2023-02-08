import React, { useContext, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import NotFoundSvg from '../assets/not_found.svg';
import { LoadingIndicator, TextButton } from '../components';
import { UserContext } from '../features';
import { useCreateUserMutation, useGetUserQuery } from '../features/api/apiSlice';
import { logout } from '../features/authentication/actions/authActions';
import { AuthContext } from '../features/authentication/authContext';
import styles from './InitRedirect.module.css';

export default function InitRedirect() {
    const navigate = useNavigate();
    const { updateUser } = useContext(UserContext);
    const { user, firebaseUid } = useContext(AuthContext);

    const {
        data: apiUser,
        error,
        isError,
        isFetching,
    } = useGetUserQuery({ firebaseUid });

    const [
        createUser,
        {
            isLoading: userCreateLoading,
            error: userCreateError,
            data: createdUser,
            isSuccess: userCreateSuccess,
            isError: userCreateErrorOccurred,
        }
    ] = useCreateUserMutation();

    useEffect(() => {
        if (!apiUser) {
            return;
        }

        updateUser(apiUser);

        const path = window.location.pathname;

        if (user.planType === "default") {
            const initialized = localStorage.getItem(`initialized_${firebaseUid}`)

            if (!initialized) {
                navigate("/user/selectSubscription");
                return;
            }

            if (!path.includes("/user")) {
                navigate("/user/editor");
            }
            return;
        }

        if (user.subscriptionValidUntil) {
            const subscriptionValidUntil = new Date(user.subscriptionValidUntil);
            const now = new Date();

            if (subscriptionValidUntil <= now) {
                if (path !== "/user/paymentOverdue") {
                    navigate("/user/paymentOverdue");
                }
                return;
            }

            if (!path.includes("/user")) {
                navigate("/user/editor");
            }
        }
    }, []);

    if (isError) {
        if (!userCreateLoading) {
            if (error.statusCode === "404") {
                createUser({ email: user.email, firebaseUid: firebaseUid })
            }
        }
        
        return (
            <div className={styles.initRedirect}>
                <div className={styles.initRedirect__content}>
                    <img src={NotFoundSvg} className="illustration__150"></img>
                    <h5>Uh oh, váratlan hiba történt</h5>
                    <div className={styles.initRedirect__content__error__description}>
                        <p>{error.errorMessage}</p>
                        {error.statusCode && <p className="description">Kód: {error.statusCode}</p>}
                    </div>
                    <TextButton
                        title="Vedd fel velünk a kapcsolatot"
                        color="var(--green)"
                        onClick={() => navigate("/contact")}
                    />
                    <TextButton
                        title="Kijelentkezés"
                        onClick={() => logout()}
                    />
                </div>
            </div>
        );
    }

    if (isFetching || userCreateLoading) {
        return (
            <div className={styles.initRedirect}>
                <div className={styles.initRedirect__content}>
                    <LoadingIndicator color="white"></LoadingIndicator>
                </div>
            </div>
        );
    }

    return <Outlet />;
}