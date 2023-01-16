import React, { useState } from "react";
import { AsyncButton } from "../../../components";
import { createRefillCheckoutSession } from "../actions/creditActions";
import "./CreditRefillOption.css";

export default function CreditRefillOptions(props) {
    const [isLoading, setIsLoading] = useState(false);

    const handleCreateCheckoutSession = async () => {
        setIsLoading(true);
        const redirectUrl = await createRefillCheckoutSession(props.data);
        setIsLoading(false);

        if (redirectUrl) {
            window.open(redirectUrl, '_blank', 'noopener,noreferrer');
        }
    }

    return (
        <div className="credit-refill-option-container">
            <div className="credit-refill-option-header">
                <h6>{props.data.name || "Kredit feltöltés"}</h6>
                <p>{props.data.cost || "0$"}</p>
            </div>
            <AsyncButton loading={isLoading} onClick={handleCreateCheckoutSession} title="Kiválaszt"></AsyncButton>
        </div>
    );
}