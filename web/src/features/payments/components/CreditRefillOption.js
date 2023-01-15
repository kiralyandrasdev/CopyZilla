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
            <h6>50 kredit</h6>
            <AsyncButton loading={isLoading} onClick={handleCreateCheckoutSession} title="Kiválaszt"></AsyncButton>
        </div>
    );
}