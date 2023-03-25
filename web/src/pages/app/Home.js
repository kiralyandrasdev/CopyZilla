import React from 'react'
import PlaceHolderSvg from "../../assets/empty_editor.svg";
import './Home.css';
import { AsyncButton } from '../../components';
import { useNavigate } from 'react-router-dom';

function HomePage() {
    const prereqText = "To get started, install the CopyZilla Outlook add-in by following the installation guide."

    const navigate = useNavigate();
    
    return (
        <div className="page page__home page__centerContent">
            <div className="page__home__content">
                <img className="promptResultView__result__placeholder__svg illustration__200" src={PlaceHolderSvg} alt="Loading..."></img>
                <h5>Welcome aboard!</h5>
                <p className='description'>{prereqText}</p>
                <AsyncButton
                    title="Add-in installation guide"
                    onClick={() => navigate("/install")}
                />
            </div>
        </div >
    );
}

export default HomePage;