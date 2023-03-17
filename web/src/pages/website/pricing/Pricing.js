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
                    description="Up to 10 AI assisted email message operations per day"
                    price="Free"
                    features={[
                        "10 emails / day / user",
                        "Email templates",
                        "Rephrase text",
                        "Automatic language detection",
                    ]}
                    onClick={() => navigate("/auth/login")}
                    selectColor="var(--grey1)"
                />
                <PricingCard
                    order="2"
                    title="Pro"
                    description="Up to 100 AI assisted email message operations per day"
                    price="26$"
                    pricingInterval="per month"
                    features={[
                        "100 emails / day / user",
                        "Email templates",
                        "Rephrase text",
                        "Automatic language detection",
                    ]}
                    onClick={() => navigate("/auth/login")}
                    selectColor="var(--green)"
                />
                <PricingCard
                    order="3"
                    title="Business"
                    description="Up to 300 AI assisted email message operations per day"
                    price="52$"
                    pricingInterval="per month"
                    features={[
                        "300 emails / day / user",
                        "Email templates",
                        "Rephrase text",
                        "Automatic language detection",
                        "Priority support",
                    ]}
                    onClick={() => navigate("/auth/login")}
                    selectColor="var(-green)"
                />
            </div>
        </div>
    );
}

export default PricingPage;