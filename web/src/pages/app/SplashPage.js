import React, { useContext, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { LoadingIndicator } from '../../components';
import { UserContext } from '../../features';
import { useGetUserQuery } from '../../features/api/apiSlice';

function SplashPage() {
    const navigate = useNavigate();
    const { updateUser } = useContext(UserContext);

    const { firebaseUid } = useSelector(state => state.auth);

    const {
        data: userFetchResult,
        error,
        isError
    } = useGetUserQuery({ firebaseUid });

    useEffect(() => {
        if (userFetchResult) {
            updateUser(userFetchResult);
            console.log(userFetchResult);
        }
    }, [userFetchResult]);

    return (
        <div className="page page__splash">
            {
                isError ?
                    <div>
                        <h4>Hiba történt</h4>
                        <p>{JSON.stringify(error)}</p>
                    </div> :
                    <LoadingIndicator color="white"></LoadingIndicator>
            }
        </div >
    );
}

export default SplashPage;