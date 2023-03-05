import React, { useContext, useEffect, useState } from 'react'
import './View.css';
import { AuthContext } from '../context/authContext';
import { getAuth } from '@firebase/auth';
import { getUser } from '../features/api/apiActions';
import LoadingIndicator from '../components/LoadingIndicator';
import { ApplicationUser } from '../features/models/model_application_user';
import { getWebsiteUrl } from '../config/envConfig';

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
            const userRes = await getUser();
            if (userRes) {
                setApplicationUser(userRes);
            }
        } catch (e) {
            console.log(e);
            setError(JSON.stringify(e));
        }

        setLoading(false);
    }

    const signOut = () => {
        const auth = getAuth();

        auth.signOut();
    }

    const handleProfileClick = async () => {
        const websiteUrl = await getWebsiteUrl();
        window.open(`${websiteUrl}/user/account`, "_blank");
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
                <p className="green">{applicationUser?.creditCount ?? "Unknown"} credits</p>
                <p>{user?.email}</p>
                <p className="description">{applicationUser?.subscriptionPlanName}</p>
                <p className="textButton" onClick={handleProfileClick}>Account</p>
            </>
        );
    }

    return (
        <div className="view view__signedIn">
            {content()}
            <p className="textButton" onClick={() => signOut()}>Sign out</p>
        </div>
    );
}

export default SignedInView;