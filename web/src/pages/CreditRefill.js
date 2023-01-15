import React from "react";
import { useSelector } from "react-redux";
import CreditRefillOptions from "../features/payments/components/CreditRefillOption";

export default function CreditRefill(props) {
    const { firebaseUid } = useSelector(state => state.auth);

    return (
        <div>
            <h2>Credit Refill</h2>
            <div>
                <CreditRefillOptions data={{
                    firebaseUid: firebaseUid,
                    priceId: "price_1MQYTIEizMZLG6ZWFXEnRAup",
                    mode: "payment",
                }}>

                </CreditRefillOptions>
            </div>
        </div>
    )
}