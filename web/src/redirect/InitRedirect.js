import React, { useContext, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import NotFoundSvg from '../assets/not_found.svg';
import { LoadingIndicator, TextButton } from '../components';
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
        const initialized = localStorage.getItem(`initialized_${firebaseUid}`)

        if (apiUser.planType !== "paid" && !initialized) {
            if (path !== "/user/selectSubscription") {
                navigate("/user/selectSubscription");
                return;
            }

            if (!path.includes("/user")) {
                navigate("/user/home");
            }
            else if (path.includes("/user/paymentOverdue")) {
                navigate("/user/home");
            }

            return;
        }

        if (apiUser.subscriptionValidUntil) {
            const subscriptionValidUntil = new Date(apiUser.subscriptionValidUntil);
            const now = new Date();

            if (subscriptionValidUntil <= now) {
                if (path !== "/user/paymentOverdue") {
                    navigate("/user/paymentOverdue");
                }
                return;
            }

            if (!path.includes("/user")) {
                navigate("/user/home");
            }
        }

        if(path === "/user/selectSubscription" && initialized) {
            navigate("/user/home");
        }
    });

    if (isError) {
        console.log(error);
        return (
            <div className={styles.initRedirect}>
                <div className={styles.initRedirect__content}>
                    <img src={NotFoundSvg} className="illustration__150"></img>
                    <h5>Uh oh, váratlan hiba történt</h5>
                    {
                        error.errorMessage &&
                        <div className={styles.initRedirect__content__error__description}>
                            <p>{error.errorMessage}</p>
                            {error.statusCode && <p className="description">Kód: {error.statusCode}</p>}
                        </div>
                    }
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