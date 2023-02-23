import React from 'react'
import './AboutUs.css';
import Dani from '../../assets/dani.png';
import Andris from '../../assets/andris.png';

function AboutUsPage() {
    const aboutUs = "A CopyZilla egy 2023-ben alakult cég, melynek célja, hogy a felhasználók számára könnyebbé tegye az e-mail írását. A CopyZilla Email Assistant segítségével a felhasználók könnyen tudnak e-mailt írni, melyeket a CopyZilla Email Assistant automatikusan fordít le a felhasználó nyelvén.";
    const aboutUsSecondary = "Reméljük, hogy a CopyZilla Email Assistant segítségével sokan tudnak majd időt ⏱ megtakarítani, melyet máshol tudnak majd hasznosítani.";
    const aboutUsContactText = "Ha bármilyen kérdésed van, kérlek vedd fel velünk a kapcsolatot a következő e-mail címen: info@copyzilla.hu 📫";
    return (
        <div className="page page__aboutUs animation__fadeInUp">
            <h4>Üdv a fedélzeten 🤠</h4>
            <div className="person__grid">
                <div className="person__container container">
                    <img src={Dani} alt="Dani"></img>
                    <h5>Reha Dániel</h5>
                    <p>🤖 Szoftverfejlesztő</p>
                </div>
                <div className="person__container container">
                    <img src={Andris} alt="Andris" />
                    <h5>Király András</h5>
                    <p>🤖 Szoftverfejlesztő</p>
                </div>
            </div>
            <div className="aboutUs__section aboutUs__section__text">
                <h5>Rólunk 👋</h5>
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