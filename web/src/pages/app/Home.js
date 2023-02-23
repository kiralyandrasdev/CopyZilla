import React from 'react'
import PlaceHolderSvg from "../../assets/empty_editor.svg";
import './Home.css';
import { AsyncButton } from '../../components';

function HomePage() {
    const subText = "A CopyZilla Email Assistant segítséget nyújt neked a leveleid megfogalmazásában, és a szövegformázásban, hogy a munkád gyorsabbá és hatékonyabbá váljon.";
    const prereqText = "A CopyZilla Email Assistant bővítményként elérhető a Google Chrome böngészőben. A letöltés után a böngészőben kattints a CopyZilla ikonra, majd jelentkezz be a CopyZilla fiókoddal, hogy elkezdhesd a munkát."
    return (
        <div className="page page__home page__centerContent">
            <div className="page__home__content">
                <img className="promptResultView__result__placeholder__svg" src={PlaceHolderSvg} alt="Loading..."></img>
                <h5>Üdv a fedélzeten!</h5>
                <p className='description'>{prereqText}</p>
                <AsyncButton
                    title="CopyZilla Email Assistant letöltése"
                    onClick={() => { }}
                />
            </div>
        </div >
    );
}

export default HomePage;