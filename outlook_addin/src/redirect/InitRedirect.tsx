import React, { useContext, useEffect } from 'react'
import { useGetUserQuery } from '../features/api/apiSlice';
import { AuthContext } from '../context/authContext';
import { UserContext } from '../context/userContext';
import LoadingIndicator from '../components/LoadingIndicator';
import { AppContext, AppState } from '../context/appContext';

type InitRedirectProps = {
    children: React.ReactNode;
}

function InitRedirect(props: InitRedirectProps) {
    const { user } = useContext(AuthContext);
    const { setUser } = useContext(UserContext);
    const { setAppState } = useContext(AppContext);

    const {
        data,
        error,
        isLoading,
        isSuccess,
    } = useGetUserQuery({ uid: user?.uid, token: user?.token }, { skip: !user });

    useEffect(() => {
        if (isSuccess) {
            setUser({
                id: data?.id,
                product: data?.product,
                consumedCredits: data?.consumedCredits,
                subscriptionStatus: data?.subscriptionStatus,
            });
        }

        if (isSuccess && data?.subscriptionStatus !== 'active' && data?.subscriptionStatus !== 'trialing') {
            setAppState(AppState.PaymentOverdue);
        }
    }, [data, isSuccess]);

    if (isLoading) {
        return <div className="center">
            <LoadingIndicator />
        </div>
    }

    if (error) {
        return <div className="center">
            <p>{JSON.stringify(error)}</p>
        </div>
    }

    return (
        <div>
            {props.children}
        </div>
    );
}

export default InitRedirect;