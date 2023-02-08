import React, { useContext, useEffect } from 'react';
import ContentLoader from 'react-content-loader';
import { useDispatch, useSelector } from 'react-redux';
import EmptySavedSvg from '../../assets/empty_saved.svg';
import { deletePromptResult, getPromptResults } from '../../features/saved_results/actions/savedResultsActions';
import SavedPromptResult from '../../features/saved_results/components/SavedPromptResult';
import { removePromptResult } from '../../features/saved_results/promptResultsSlice';
import { UserContext } from '../../features/user/context/userContext';
import './AppPage.css';
import './SavedResults.css';

function LoadingPlaceholder() {
    return (
        <ContentLoader width="100%" height="700px" backgroundColor="#40414F" foregroundColor="#666879">
            <rect x="0" y="0" ry="8" xy="8" width="100%" height="90px" />
            <rect x="0" y="110px" ry="8" width="100%" height="90px" />
            <rect x="0" y="220px" ry="8" width="100%" height="90px" />
            <rect x="0" y="330px" ry="8" width="100%" height="90px" />
            <rect x="0" y="440px" ry="8" width="100%" height="90px" />
            <rect x="0" y="550px" ry="8" width="100%" height="90px" />
            <rect x="0" y="660px" ry="8" width="100%" height="90px" />
        </ContentLoader>
    );
}

export default function SavedResultsPage() {
    const { user } = useContext(UserContext);
    const { isLoading, items } = useSelector(state => state.promptResults);

    const dispatch = useDispatch();

    const handleDeletePromptResult = (payload) => {
        dispatch(deletePromptResult(payload));
        dispatch(removePromptResult(payload));
    }

    useEffect(() => {
        if (user.id) {
            dispatch(getPromptResults({ userId: user.id }));
        }
    }, [user]);

    const isEmpty = items.length === 0 && !isLoading;

    const content = () => {
        if (isLoading) {
            return <LoadingPlaceholder />
        }

        if (isEmpty) {
            return <>
                <img className="illustration" src={EmptySavedSvg} alt="Loading..."></img>
                <h4>Nem tálalható elmentett szöveg a fiókodban.</h4>
                <p className="description">Hozz létre szöveget, majd mentsd el a kedvenceid.</p>
            </>
        }

        return (
            <div className="page__savedResultsPage__list">
                {items.map((promptResult, index) => {
                    const animationDelay = index * 0.1;
                    return <SavedPromptResult onDelete={handleDeletePromptResult} style={{ "animationDelay": `${animationDelay}s` }} key={index} data={promptResult}></SavedPromptResult>
                })}
            </div>
        )
    }

    let className = "page animation__fadeInUp";

    if (isEmpty) { // isEmpty
        className += " page__centerContent";
    } else {
        className += " page__savedResultsPage";
    }

    return (
        <div className={className}>
            {isEmpty ? <></> : <h4>Mentések</h4>}
            {content()}
        </div>
    )
}