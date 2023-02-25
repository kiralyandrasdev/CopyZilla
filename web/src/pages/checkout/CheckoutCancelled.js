import React from "react";
import NotFoundSvg from "../../assets/not_found.svg";

export default function CheckoutCanceled(props) {
    return (
        <div className="page page__centerContent page__checkout__callback animation__fadeInUp">
            <img className="illustration" src={NotFoundSvg}></img>
            <p>Something went wrong during the payment process</p>
            <p className="description">Please try again</p>
        </div>
    )
}