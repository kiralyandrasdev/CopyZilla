import React, { useContext, useEffect } from 'react'
import { useGetUserQuery } from '../features/api/apiSlice';
import { AuthContext } from '../context/authContext';
import { UserContext } from '../context/userContext';
import LoadingIndicator from '../components/LoadingIndicator';

type InitRedirectProps = {
    children: React.ReactNode;
}

function InitRedirect(props: InitRedirectProps) {
    const { user } = useContext(AuthContext);
    const { setUser } = useContext(UserContext);

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
                subscriptionPlanName: data?.subscriptionPlanName,
            });
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