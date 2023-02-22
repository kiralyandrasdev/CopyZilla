import React, { useContext, useEffect, useState } from 'react'
import './View.css';
import { AuthContext } from '../context/authContext';
import { getAuth } from '@firebase/auth';
import { getUser } from '../features/api/apiActions';
import LoadingIndicator from '../components/LoadingIndicator';
import { ApplicationUser } from '../features/models/model_application_user';

function SignedInView() {
    const { user } = useContext(AuthContext);

    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');

    const [applicationUser, setApplicationUser] = useState<ApplicationUser | null>(null);

    useEffect(() => {
        handleUserFetch();
    }, []);

    const handleUserFetch = async () => {
        setLoading(true);

        try {
            const userRes = await getUser({
                uid: user?.uid!,
                token: user?.token!,
            })

            if (userRes) {
                setApplicationUser(userRes);
            }
        } catch (e) {
            setError(JSON.stringify(e));
        }

        setLoading(false);
    }

    const signOut = () => {
        const auth = getAuth();

        auth.signOut();
    }

    const content = () => {
        if (loading) {
            return <LoadingIndicator />
        }

        if (error) {
            return <p>{error}</p>
        }

        return (
            <>
                <p className="green">{applicationUser?.creditCount ?? "Unknown"} kredit</p>
                <p>{user?.email}</p>
                <p className="description">{applicationUser?.subscriptionPlanName}</p>
            </>
        );
    }

    return (
        <div className="view view__signedIn">
            {content()}
            <p className="textButton" onClick={() => signOut()}>Kijelentkezés</p>
        </div>
    );
}

export default SignedInView;