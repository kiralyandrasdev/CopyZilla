import React from "react";
import WellDoneSvg from "../../assets/well_done.svg";

export default function CheckoutCompleted(props) {
    return (
        <div className="page page__centerContent page__checkout__callback animation__fadeInUp">
            <img className="illustration" src={WellDoneSvg}></img>
            <h4>Jó munkát kívánunk!</h4>
            <p className="description">Vásárlás után megeshet, hogy frissítened kell az oldalt.</p>
        </div>
    )
}