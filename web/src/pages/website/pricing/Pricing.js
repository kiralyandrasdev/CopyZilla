import React from 'react';
import './Pricing.css';
import PricingCard from './cards/PricingCard';
import { useNavigate } from 'react-router-dom';

function PricingPage() {
    const navigate = useNavigate();
    const headerText = "Kedvező csomagok mindenki számára";
    const subHeaderText = "Vedd a kezedbe az írányítást az e-mail üzeneteid felett és hagyd, hogy időt takarítsunk meg neked."
    const subText = "Egy e-mail megfogalmazása egy kreditet vesz igénybe"
    return (
        <div className="page page__public page__pricing animation__fadeInUp">
            <div className="page__pricing__header">
                <h4>{headerText}</h4>
                {/*  <p>{subHeaderText}</p> */}
            </div>
            <div className="pricing__cards">
                <PricingCard
                    order="1"
                    title="Személyes"
                    description="Írj havonta 10 e-mail üzenetet a CopyZilla Email Assistant segítségével."
                    price="Ingyenes"
                    features={[
                        "10 kredit havonta",
                        "Automatikus nyelv felismerés",
                    ]}
                    onClick={() => navigate("/auth/login")}
                    selectColor="var(--grey1)"
                />
                <PricingCard
                    order="2"
                    title="Profi"
                    description="Írj havonta 100 e-mail üzenetet a CopyZilla Email Assistant segítségével."
                    price="4490 Ft"
                    pricingInterval="havonta"
                    features={[
                        "100 kredit havonta",
                        "Automatikus nyelv felismerés",
                        "Új funkciók azonnali elérése",
                    ]}
                    onClick={() => navigate("/auth/login")}
                    selectColor="var(--green)"
                />
                <PricingCard
                    order="3"
                    title="Üzleti"
                    description="Írj havonta 300 e-mail üzenetet a CopyZilla Email Assistant segítségével."
                    price="7490 Ft"
                    pricingInterval="havonta"
                    features={[
                        "300 kredit havonta",
                        "Automatikus nyelv felismerés",
                        "Új funkciók azonnali elérése",
                    ]}
                    onClick={() => navigate("/auth/login")}
                    selectColor="var(-green)"
                />
            </div>
            <div className="page__pricing__subtext animation__fadeInUp">
                <p>{subText}</p>
            </div>
        </div>
    );
}

export default PricingPage;