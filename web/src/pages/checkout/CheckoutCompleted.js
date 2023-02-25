import React from "react";
import WellDoneSvg from "../../assets/well_done.svg";

export default function CheckoutCompleted(props) {
    return (
        <div className="page page__centerContent page__checkout__callback animation__fadeInUp">
            <img className="illustration" src={WellDoneSvg}></img>
            <h4>Payment successful</h4>
            <p className="description">After payment you may need to refresh the page to see the changes in your account</p>
        </div>
    )
}