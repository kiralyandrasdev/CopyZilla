import React, { useEffect, useRef, useState } from "react";
import { FiMenu } from "react-icons/fi";
import { Outlet, useNavigate } from "react-router-dom";
import useOutsideAlerter from "../components/utils/useOutsideAlerter";
import "./PublicLayout.css";
import Logo128TrFl from "../assets/logo/LOGO_TRANS_FULL_tr_fl_128.png";

export default function PublicLayout() {
    const navigate = useNavigate();

    const [showTextLogo, setShowTextLogo] = useState(false);

    useEffect(() => {
        const listenerFunction = () => {
            const header = document.querySelector('.header__public');

            if (!header) return;

            if (window.pageYOffset > 0) {
                setShowTextLogo(false);
                header.classList.add('scrolled', 'dropshadow');
            } else {
                setShowTextLogo(true);
                header.classList.remove('scrolled', 'dropshadow');
            }
        }

        window.addEventListener('scroll', listenerFunction);

        return () => {
            window.removeEventListener('scroll', listenerFunction);
        }
    }, []);

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

    const handleClickPricing = () => {
        // If path is not '/' then navigate to '/' and then scroll to pricing
        if (window.location.pathname !== "/") {
            navigate("/");
            setTimeout(() => {
                handleScrollToPricing();
            }, 300);
            return;
        }

        // If path is '/' then scroll to pricing
        handleScrollToPricing();
    }

    const handleScrollToPricing = () => {
        const element = document.getElementById("pricing");

        console.log(element);

        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    }

    let menuClass = "header__nav__menu header__nav__menu__public dropshadow transition__parent";

    if (menuActive) {
        menuClass += " transition__fadeInDown";
    }

    return (
        <div className="layout layout__public">
            <header className="header header__public animation__fadeInDown">
                <div className="header__public__logo" onClick={() => navigate("/")}>
                    {/* <img src={Logo128} alt="" className="logo" /> */}
                    <img src={Logo128TrFl} alt="" className="logo_tr" />
                    <h5 className="white header__nav__row__item">copy<span className="green">zilla</span></h5>
                </div>
                <div className="header__nav__row">
                    <a className="header__nav__row__item semi-bold" href="/auth/login">Sign in</a>
                    <a className="header__nav__row__item header__nav__row__item__rounded semi-bold" href="/auth/signup">Sign up</a>
                    <a className="header__nav__row__item semi-bold" onClick={() => handleClickPricing()}>Pricing</a>
                    <a className="header__nav__row__item semi-bold" href="/contact">Contact Us</a>
                </div>
                <div className="header__portrait">
                    <FiMenu onClick={() => handleMenuActive(!menuActive)} className="header__nav__icon nav__icon"></FiMenu>
                    <ul ref={wrapperRef} className={menuClass}>
                        <li onClick={() => nandleNavigate("/auth/login")} className="header__nav__item semi-bold">Sign in</li>
                        <li onClick={() => nandleNavigate("/auth/signup")} className="header__nav__item semi-bold green">Sign up</li>
                        <li onClick={() => handleClickPricing()} className="header__nav__item semi-bold">Pricing</li>
                        <li onClick={() => nandleNavigate("/contact")} className="header__nav__item semi-bold">Contact Us</li>
                    </ul>
                </div>
            </header>
            <main className="main__public">
                <Outlet></Outlet>
            </main>
            <footer className="footer footer__public">
                <div className="footer__content">
                    <div className="footer__info">
                        <p>© 2023 CopyZilla</p>
                        <p>info@copyzilla.hu</p>
                    </div>
                    <div className="footer__nav">
                        <a href="/termsOfService">Terms of service</a>
                        <a href="/privacyPolicy">Privacy policy</a>
                        <a href="/about">About Us</a>
                    </div>
                </div>
            </footer>
        </div>
    );
}