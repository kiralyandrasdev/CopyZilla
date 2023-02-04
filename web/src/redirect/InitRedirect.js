import React, { useContext, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import { LoadingIndicator } from '../components';
import { UserContext } from '../features';
import { useGetUserQuery } from '../features/api/apiSlice';

export default function InitRedirect() {
    const navigate = useNavigate();
    const { updateUser } = useContext(UserContext);

    const { firebaseUid } = useSelector(state => state.auth);


    const {
        data: user,
        error,
        isError,
        isFetching,
    } = useGetUserQuery({ firebaseUid });

    useEffect(() => {
        if (user) {
            updateUser(user);
        }

        if (!user) return;

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
            console.log("subscriptionValidUntil: ", user.subscriptionValidUntil);

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

    }, [user]);

    if (isError) {
        return (
            <div className="page page__splash">
                <div>
                    <h4>Hiba történt</h4>
                    <p>{JSON.stringify(error)}</p>
                </div>
            </div>
        );
    }

    if (isFetching) {
        return (
            <div className="page page__splash">
                <LoadingIndicator color="white"></LoadingIndicator>;
            </div>
        );
    }

    return <Outlet />;
}