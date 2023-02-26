import React from 'react'
import './AboutUs.css';
import Dani from '../../assets/dani.png';
import Andris from '../../assets/andris.png';

function AboutUsPage() {
    const aboutUs = "CopyZilla is a company founded in 2023 with the goal of making email writing easier for users. With the CopyZilla Email Assistant, users can easily write emails that the assistant automatically translates into the user's language.";
    const aboutUsSecondary = "We hope that with the help of CopyZilla Email Assistant, many people will be able to save time ⏱ that they can utilize elsewhere.";
    const aboutUsContactText = "If you have any questions, please contact us at the following email address: info@copyzilla.hu 📫";
    return (
        <div className="page page__aboutUs animation__fadeInUp">
            <h4>Welcome aboard 🤠</h4>
            <div className="person__grid">
                <div className="person__container container">
                    <img src={Dani} alt="Dani"></img>
                    <h5>Dániel Reha</h5>
                    <p>🤖 Software Developer</p>
                </div>
                <div className="person__container container">
                    <img src={Andris} alt="Andris" />
                    <h5>András Király</h5>
                    <p>🤖 Software Developer</p>
                </div>
            </div>
            <div className="aboutUs__section aboutUs__section__text">
                <h5>About us 👋</h5>
                <p>
                    {aboutUs}
                </p>
                <p>
                    {aboutUsSecondary}
                </p>
                <p>
                    {aboutUsContactText}
                </p>
            </div>
        </div>
    );
}

export default AboutUsPage;