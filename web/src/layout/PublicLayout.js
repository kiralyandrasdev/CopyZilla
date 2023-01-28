import React, { useRef, useState } from "react";
import { FiMenu } from "react-icons/fi";
import { Outlet, useNavigate } from "react-router-dom";
import useOutsideAlerter from "../components/utils/useOutsideAlerter";
import "./PublicLayout.css";

export default function PublicLayout() {
    const navigate = useNavigate();

    const [menuActive, setMenuActive] = useState(false);
    const handleMenuActive = (value) => {
        setMenuActive(value);
    }

    const wrapperRef = useRef(null);
    useOutsideAlerter(wrapperRef, (() => handleMenuActive(false)));

    const nandleNavigate = (path) => {
        navigate(path);
        setMenuActive(false);
    }

    let menuClass = "header__nav__menu header__nav__menu__public dropshadow transition__parent";

    if (menuActive) {
        menuClass += " transition__fadeInDown";
    }

    return (
        <div className="layout layout__public">
            <header className="header header__public animation__fadeInDown dropshadow">
                <div className="header__fullwidth header__public__content">
                    <h5 onClick={() => navigate("/")}>copy<span className="green">zilla</span></h5>
                    <div className="header__nav__row">
                        <a className="header__nav__row__item semi-bold" href="/auth/login">Bejelentkezés</a>
                        <a className="header__nav__row__item semi-bold" href="/pricing">Áraink</a>
                        <a className="header__nav__row__item semi-bold" href="/aboutUs">Rólunk</a>
                    </div>
                </div>
                <div className="header__portrait header__public__content">
                    <h5 onClick={() => navigate("/")}>copy<span className="green">zilla</span></h5>
                    <FiMenu onClick={() => handleMenuActive(!menuActive)} className="header__nav__icon nav__icon header__nav__icon--dark"></FiMenu>
                    <ul ref={wrapperRef} className={menuClass}>
                        <li onClick={() => nandleNavigate("/auth/login")} className="header__nav__item semi-bold green">Bejelentkezés</li>
                        <li onClick={() => nandleNavigate("/pricing")} className="header__nav__item semi-bold">Áraink</li>
                        <li onClick={() => nandleNavigate("/aboutUs")} className="header__nav__item semi-bold">Rólunk</li>
                        <li onClick={() => nandleNavigate("/contact")} className="header__nav__item semi-bold">Kapcsolat</li>
                    </ul>
                </div>
            </header>
            <main className="main main__public">
                <Outlet></Outlet>
            </main>
            <footer className="footer footer__public">
                <p>2023 © CopyZilla - Minden jog fenntartva</p>
                <a href="/termsOfService">Felhasználási feltételek</a>
                <a href="/privacyPolicy">Adatvédelmi irányelvek</a>
                <a href="/contact">Kapcsolat</a>
            </footer>
        </div>
    );
}