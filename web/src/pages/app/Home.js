import React from 'react'
import PlaceHolderSvg from "../../assets/empty_editor.svg";
import './Home.css';
import { AsyncButton } from '../../components';

function HomePage() {
    const subText = "CopyZilla Email Assistant helps you write better emails. It uses GPT-3 to generate emails based on context and your input."
    const prereqText = "To get started, download the CopyZilla Email Assistant for Chrome, or any other browser that supports Chrome extensions."
    return (
        <div className="page page__home page__centerContent">
            <div className="page__home__content">
                <img className="promptResultView__result__placeholder__svg" src={PlaceHolderSvg} alt="Loading..."></img>
                <h5>Welcome on board!</h5>
                <p className='description'>{prereqText}</p>
                <AsyncButton
                    title="Download CopyZilla Email Assistant for Chrome"
                    onClick={() => { }}
                />
            </div>
        </div >
    );
}

export default HomePage;