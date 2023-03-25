import React, { useContext, useEffect, useRef, useState } from "react";
import { FiMenu, FiPlus } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import useOutsideAlerter from "../../components/utils/useOutsideAlerter";
import { useGetUserQuery } from "../../features/api/apiSlice";
import { AuthContext } from "../../features/authentication/authContext";
import { UserContext } from "../../features/user/context/userContext";
import './PrivateHeader.css';
import { logout } from "../../features/authentication/actions/authActions";
import Logo128TrFl from "../../assets/logo/LOGO_TRANS_FULL_tr_fl_128.png";

export default function PrivateHeader() {
    const { firebaseUid } = useContext(AuthContext);
    const { user, updateUser } = useContext(UserContext);

    const [menuActive, setMenuActive] = useState(false);
    const handleMenuActive = (value) => {
        setMenuActive(value);
    }

    const wrapperRef = useRef(null);
    useOutsideAlerter(wrapperRef, (() => handleMenuActive(false)));

    const navigate = useNavigate();
    const handleNavigate = (path) => {
        navigate(path);
        setMenuActive(false);
    }

    const {
        data: userFetchResult,
        error,
        isLoading,
        isFetching,
    } = useGetUserQuery({ firebaseUid });

    useEffect(() => {
        if (userFetchResult) {
            updateUser(userFetchResult);
        }
    }, [userFetchResult]);

    if (isFetching || isLoading) {
        return <header></header>
    }

    const planName = () => {
        if (isFetching || isLoading) {
            return "Loading..."
        }

        if (error) {
            return "Unknown error"
        }

        console.log(userFetchResult);

        return userFetchResult.product.name;
    }

    const trialIndicator = () => {
        if (userFetchResult.subscriptionStatus === "trialing") {
            const daysLeft = Math.round((new Date(userFetchResult.subscriptionValidUntil) - new Date()) / (1000 * 60 * 60 * 24));
            return (
                <div className="header__nav__item__trial">
                    <p>{daysLeft} days left</p>
                </div>
            )
        }

        return <></>;
    }

    let menuClass = "header__nav__menu header__nav__menu__private dropshadow transition__parent";

    if (menuActive) {
        menuClass += " transition__fadeInDown";
    }

    return (
        <>
            <header className="header header__private header__fullwidth animation__fadeInDown">
                <div className="header__private__control">
                    <p className="semi-bold">{planName()}</p>
                    {trialIndicator()}
                </div>
                <div className="header__main">
                    <a className="header__nav__item semi-bold green" href="/install">
                        Get Outlook Add-in
                    </a>
                    <a className="header__nav__item semi-bold" href="/user/account">Account</a>
                </div>
            </header>
            <header className="header header__private header__portrait animation__fadeInDown">
            <div className="header__public__logo" onClick={() => navigate("/")}>
                    {/* <img src={Logo128} alt="" className="logo" /> */}
                    <img src={Logo128TrFl} alt="" className="logo_tr" />
                    <h5 className="white header__nav__row__item">copy<span className="green">zilla</span></h5>
                </div>
                <FiMenu onClick={() => handleMenuActive(!menuActive)} className="header__nav__icon nav__icon header__nav__icon--light"></FiMenu>
                <ul ref={wrapperRef} className={menuClass}>
                    <p className="description">{user.email}</p>
                    <li onClick={() => handleNavigate("/install")} className="header__nav__item semi-bold green">Get Outlook Add-in</li>
                    <li onClick={() => handleNavigate("/user/emailTemplates")} className="header__nav__item semi-bold">Email Templates</li>
                    <li onClick={() => handleNavigate("/user/account")} className="header__nav__item semi-bold">Account</li>
                    <li onClick={() => logout()} className="header__nav__item semi-bold">Sign out</li>
                </ul>
            </header>
        </>
    )
}