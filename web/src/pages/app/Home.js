import React from 'react'
import PlaceHolderSvg from "../../assets/empty_editor.svg";
import './Home.css';
import { AsyncButton } from '../../components';

function HomePage() {
    const prereqText = "To get started, download CopyZilla Email Assistant from the Chrome Web Store"
    const clientSupportText = "Currently supported on Gmail and Outlook web clients"
    
    const chromeDownloadUrl = "https://chrome.google.com/webstore/detail/copyzilla-email-assistant/gakgnepokfbooliogomceelndhjgahkf";

    const handleDownload = (url) => {
        window.open(url, "_blank");
    }
    return (
        <div className="page page__home page__centerContent">
            <div className="page__home__content">
                <img className="promptResultView__result__placeholder__svg" src={PlaceHolderSvg} alt="Loading..."></img>
                <h5>Welcome aboard!</h5>
                <p className='description'>{prereqText}</p>
                <AsyncButton
                    title="Download for Chrome"
                    onClick={() => handleDownload(chromeDownloadUrl)}
                />
                <p className='description'>{clientSupportText}</p>
            </div>
        </div >
    );
}

export default HomePage;