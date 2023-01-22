import React from "react";
import NotFoundSvg from "../../assets/not_found.svg";

export default function CheckoutCanceled(props) {
    return (
        <div className="page page__centerContent page__checkout__callback animation__fadeInUp">
            <img className="illustration" src={NotFoundSvg}></img>
            <h4>Uh oh, hiba történt a vásárlás folyamán!</h4>
            <p className="description">Kérünk, próbálkozz újra.</p>
        </div>
    )
}