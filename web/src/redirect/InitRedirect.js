import React, { useContext, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import NotFoundSvg from '../assets/not_found.svg';
import { LoadingIndicator, TextButton, TextField } from '../components';
import { UserContext } from '../features';
import { useGetUserQuery } from '../features/api/apiSlice';
import { logout } from '../features/authentication/actions/authActions';
import { AuthContext } from '../features/authentication/authContext';
import styles from './InitRedirect.module.css';

export default function InitRedirect() {
    const navigate = useNavigate();
    const { updateUser } = useContext(UserContext);
    const { firebaseUid } = useContext(AuthContext);

    const {
        data: apiUser,
        error,
        isError,
        isFetching,
    } = useGetUserQuery({ firebaseUid });

    useEffect(() => {
        if (apiUser == null) {
            return;
        }

        updateUser(apiUser);

        const path = window.location.pathname;
        const subscriptionStatus = apiUser.subscriptionStatus;

        console.log("subscriptionStatus: " + subscriptionStatus);

        if (!path.includes("/user")) {
            navigate("/user/paymentOverdue");
        }
        
        return;

        if (subscriptionStatus !== "active" && subscriptionStatus !== "trialing") {
            if (path !== "/user/paymentOverdue") {
                navigate("/user/paymentOverdue");
                return;
            } else {
                navigate("/user/home");
            }
        }

        if (!path.includes("/user")) {
            navigate("/user/home");
        }
    });

    if (isError) {
        console.log(error);
        return (
            <div className={styles.initRedirect}>
                <div className={styles.initRedirect__content}>
                    <img src={NotFoundSvg} className="illustration__150"></img>
                    <h5>Oops, an unexpected error occurred.</h5>
                    {
                        error.errorMessage &&
                        <div className={styles.initRedirect__content__error__description}>
                            <p>{error.errorMessage}</p>
                            {error.statusCode && <p className="description">Code: {error.statusCode}</p>}
                        </div>
                    }
                    <p>Please contact us at info@copyzilla.hu.</p>
                    <TextButton
                        title="Logout"
                        onClick={() => logout()}
                        color="var(--green)"
                    />
                </div>
            </div>
        );
    }

    if (isFetching) {
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