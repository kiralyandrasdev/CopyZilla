import React, { useContext, useEffect, useRef, useState } from "react";
import { FiMenu, FiPlus } from "react-icons/fi";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AsyncButton } from "../../components";
import useOutsideAlerter from "../../components/utils/useOutsideAlerter";
import { useGetUserQuery } from "../../features/api/apiSlice";
import { UserContext } from "../../features/user/context/userContext";
import './PrivateHeader.css';

export default function PrivateHeader() {
    const { firebaseUid } = useSelector((state) => state.auth);
    const { user, updateUser } = useContext(UserContext);

    const [menuActive, setMenuActive] = useState(false);
    const handleMenuActive = (value) => {
        setMenuActive(value);
    }

    const wrapperRef = useRef(null);
    useOutsideAlerter(wrapperRef, (() => handleMenuActive(false)));

    const navigate = useNavigate();
    const nandleNavigate = (path) => {
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

    const creditCount = () => {
        if (isFetching || isLoading) {
            return "Betöltés..."
        }

        if (error) {
            return "Hiba történt"
        }

        return user.creditCount + " kredit"
    }

    const planName = () => {
        if (isFetching || isLoading) {
            return "Betöltés..."
        }

        if (error) {
            return "Hiba történt"
        }

        return userFetchResult.subscriptionPlanName;
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
                    <p className="creditCount semi-bold">{creditCount()}</p>
                    <AsyncButton onClick={() => navigate("/user/creditRefill")} shrinked={true} title="Kredit feltöltés"></AsyncButton>
                </div>
                <a className="header__nav__item semi-bold" href="/user/account">Fiók</a>
            </header>
            <header className="header header__private header__portrait animation__fadeInDown">
                <FiPlus onClick={() => nandleNavigate("/user/editor")} className="header__nav__icon nav__icon header__nav__icon--light"></FiPlus>
                <div className="header__main">
                    <h5>copyzilla</h5>
                </div>
                <FiMenu onClick={() => handleMenuActive(!menuActive)} className="header__nav__icon nav__icon header__nav__icon--light"></FiMenu>
                <ul ref={wrapperRef} className={menuClass}>
                    <li onClick={() => nandleNavigate("/user/account")} className="semi-bold">
                        <div>
                            <h6>{creditCount()}</h6>
                            <p className="description">{user.email}</p>
                        </div>
                    </li>
                    <span className="header__nav__item__divider" />
                    <li onClick={() => nandleNavigate("/user/editor")} className="header__nav__item semi-bold green">Létrehozás</li>
                    <li onClick={() => nandleNavigate("/user/savedResults")} className="header__nav__item semi-bold">Mentések</li>
                    <li onClick={() => nandleNavigate("/user/creditRefill")} className="header__nav__item semi-bold">Kredit feltöltés</li>
                    <li onClick={() => nandleNavigate("/user/account")} className="header__nav__item semi-bold">Fiók</li>
                    <li onClick={() => nandleNavigate("/user/account")} className="header__nav__item semi-bold">Kijelentkezés</li>
                </ul>
            </header>
        </>
    )
}