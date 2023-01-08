import React from "react";
import { useNavigate } from "react-router-dom";
import "./Landing.css";

function Landing() {
    let navigate = useNavigate();
    const routeChange = () => {
        let path = `/auth/login`;
        navigate(path);
    }

    return (
        <div id="hero">
            <h1>A jövő elkerülhetetlen</h1>
            <p>Meggyőző szövegírás mesterséges intelligenciával</p>
            <button id="try-out-button" onClick={() => routeChange()}>Kipróbálom</button>
        </div>
    )
}

export default Landing;