import React from 'react';
import './Pricing.css';
import PricingCard from './cards/PricingCard';
import { useNavigate } from 'react-router-dom';

function PricingPage() {
    const navigate = useNavigate();
    const headerText = "Favorable packages for everyone";
    const subHeaderText = "Take control over your email messages and let us help you save time"
    const subText = "Composing an email requires one credit"
    return (
        <div className="page page__public page__pricing animation__fadeInUp">
            <div className="page__pricing__header">
                <h4>{headerText}</h4>
                {/*  <p>{subHeaderText}</p> */}
            </div>
            <div className="pricing__cards">
                <PricingCard
                    order="1"
                    title="Personal"
                    description="Write 10 email messages per month with the help of CopyZilla Email Assistant"
                    price="Free"
                    features={[
                        "10 credits per month",
                        "Automatic language detection",
                    ]}
                    onClick={() => navigate("/auth/login")}
                    selectColor="var(--grey1)"
                />
                <PricingCard
                    order="2"
                    title="Pro"
                    description="Write 100 email messages per month with the help of CopyZilla Email Assistant"
                    price="9$"
                    pricingInterval="per month"
                    features={[
                        "100 credits per month",
                        "Automatic language detection",
                        "Instant access to new features",
                    ]}
                    onClick={() => navigate("/auth/login")}
                    selectColor="var(--green)"
                />
                <PricingCard
                    order="3"
                    title="Business"
                    description="Write 300 email messages per month with the help of CopyZilla Email Assistant"
                    price="18$"
                    pricingInterval="per month"
                    features={[
                        "300 credits per month",
                        "Automatic language detection",
                        "Instant access to new features",
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