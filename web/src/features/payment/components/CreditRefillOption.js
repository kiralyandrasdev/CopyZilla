import React, { useState } from "react";
import { AsyncButton } from "../../../components";
import { CHECKOUT_MODE, createCheckoutSessionAsync } from "../actions/paymentActions";
import "./CreditRefillOption.css";

export default function CreditRefillOptions(props) {
    const [isLoading, setIsLoading] = useState(false);

    const handleCreateCheckoutSession = async () => {
        setIsLoading(true);
        const redirectUrl = await createCheckoutSessionAsync(CHECKOUT_MODE.PAYMENT, { firebaseUid: props.data.firebaseUid, priceId: props.data.priceId });
        setIsLoading(false);

        if (redirectUrl) {
            window.open(redirectUrl, '_blank', 'noopener,noreferrer');
        }
    }

    let className = "creditRefill__optionContainer dropshadow animation__fadeInUp";

    if (props.hasOwnProperty("order")) {
        className += ` creditRefill__optionContainer__${props.order}`;
        console.log(className)
    }

    return (
        <div className={className}>
            <div className="creditRefill__optionContainer__header">
                <div className="creditRefill__optionContainer__creditCount">
                    <h5>{props.data.creditCount}</h5>
                    <p> kredit</p>
                </div>
                <p>{props.data.cost || "0 Forint"}</p>
            </div>
            <AsyncButton loading={isLoading} onClick={handleCreateCheckoutSession} title="Kiválaszt"></AsyncButton>
        </div>
    );
}