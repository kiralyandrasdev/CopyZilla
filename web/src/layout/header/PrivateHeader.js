import React, { useContext, useEffect, useRef, useState } from "react";
import { FiMenu, FiPlus } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import useOutsideAlerter from "../../components/utils/useOutsideAlerter";
import { useGetUserQuery } from "../../features/api/apiSlice";
import { AuthContext } from "../../features/authentication/authContext";
import { UserContext } from "../../features/user/context/userContext";
import './PrivateHeader.css';
import { logout } from "../../features/authentication/actions/authActions";

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
            return "Loading..."
        }

        if (error) {
            return "Unknown error"
        }

        if (!userFetchResult.product || userFetchResult.product.dailyCreditLimit == null || user.consumedCredits == null) {
            return "Unknown credits";
        }

        const remainigCredits = userFetchResult.product.dailyCreditLimit - user.consumedCredits;

        return remainigCredits + " credits"
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
                </div>
                <div className="header__main">
                  {/*   <a className="header__nav__item semi-bold green" href="/user/home">
                        Outlook Add-in
                    </a> */}
                    <a className="header__nav__item semi-bold green" href="/user/home">
                        Chrome extension
                    </a>
                    <a className="header__nav__item semi-bold" href="/user/account">Account</a>
                </div>
            </header>
            <header className="header header__private header__portrait animation__fadeInDown">
                <FiPlus onClick={() => nandleNavigate("/user/home")} className="header__nav__icon nav__icon header__nav__icon--light"></FiPlus>
                <div className="header__main">
                    <h5 onClick={() => nandleNavigate("/")}>copyzilla</h5>
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
                    <li onClick={() => nandleNavigate("/user/home")} className="header__nav__item semi-bold green">Download extension</li>
                    <li onClick={() => nandleNavigate("/user/emailTemplates")} className="header__nav__item semi-bold">Email Templates</li>
                    <li onClick={() => nandleNavigate("/user/creditRefill")} className="header__nav__item semi-bold">Buy credits</li>
                    <li onClick={() => nandleNavigate("/user/account")} className="header__nav__item semi-bold">Account</li>
                    <li onClick={() => logout()} className="header__nav__item semi-bold">Sign out</li>
                </ul>
            </header>
        </>
    )
}