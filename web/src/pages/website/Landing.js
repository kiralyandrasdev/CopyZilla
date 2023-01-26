import React from 'react';
import { useNavigate } from 'react-router-dom';
import CreativeProcessSvg from '../../assets/creative_process.svg';
import BodyTextSvg from '../../assets/well_done.svg';
import { AsyncButton } from '../../components';
import './Landing.css';

function LandingPage() {
    const navigate = useNavigate();

    return (
        <div className="page page__public page__landing animation__fadeInUp">
            <div className="page__landing__section page__landing__section__hero">
                <div className="page__landing__section__hero__left">
                    <h4>Szövegírás mesterséges intelligenciával</h4>
                    <p className="description">Quis velit voluptate non dolor mollit quis laboris voluptate proident.</p>
                    <div className="page__landing__section__hero__left__cta">
                        <AsyncButton title="Kipróbálom" onClick={() => navigate("/auth/login")}></AsyncButton>
                        <p className="description">Ingyenes verzió elérhető</p>
                    </div>
                </div>
                <div className="page__landing__section__hero__right">
                    <img className="illustration__300" src={BodyTextSvg}></img>
                </div>
            </div>
            <div className="page__landing__section page__landing__section__2">
                <div className="page__landing__section__2__heading">
                    <h4>Lorem ipsum dolor sit amet.</h4>
                    <p className="description">Quis velit voluptate non dolor mollit quis laboris voluptate proident.</p>
                </div>
                <img className="illustration__400" src={CreativeProcessSvg}></img>
            </div>
        </div>
    );
}

export default LandingPage;