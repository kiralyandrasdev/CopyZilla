import React, { useContext, useEffect, useState } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../features';
import { useGetUserQuery } from '../../features/api/apiSlice';
import { signOut, signOutFirebaseUser } from '../../features/authentication/actions/authActions';
import useWindowDimensions from '../../hooks/useWindowDimensions';
import './Header.css';

function Header(props) {
    const { width, height } = useWindowDimensions();
    const portrait = height / width >= 16 / 10;

    const [navOpen, setNavOpen] = useState(false);
    const toggleNavMenu = () => {
        setNavOpen(!navOpen);
    }

    const dispatch = useDispatch();
    const handleLogout = () => {
        dispatch(signOutFirebaseUser());
    }

    const { accessToken, firebaseUid } = useSelector((state) => state.auth);

    if (accessToken && props.id === "signed-in-header") {
        const { user } = useContext(UserContext);
        return (
            <div className="header" id="home-header">
                <a href="/">
                    <h5 id="landing-logo">copyzilla</h5>
                </a>
                {
                    portrait ?
                        <div className="header-nav-burger">
                            <div className="header-nav-burger-icon" onClick={() => toggleNavMenu()}>
                                <GiHamburgerMenu></GiHamburgerMenu>
                            </div>
                            <div id="header-nav-burger-popup" className={navOpen ? "open" : ""}>
                                <ul>
                                    <li className="header-nav-burger-menu-item" href="/home/editor">Szerkesztő</li>
                                    <li className="header-nav-burger-menu-item" href="/user/account">Fiók</li>
                                    <li className="header-nav-burger-menu-item" href="/auth/login">Kijelentkezés</li>
                                </ul>
                            </div>
                        </div>
                        :
                        <div className="header-nav-menu">
                            {user.creditCount && <a className="header-credit-count" style={{ 'color': '#6b4eff' }}>{user.creditCount} kredit</a>}
                            <a href="/user/editor">Szerkesztő</a>
                            <a href="/user/account">Fiók</a>
                            <a onClick={handleLogout}>Kijelentkezés</a>
                        </div>
                }
            </div>
        )
    }

    return (
        <div className="header" id={props.id}>
            <a href="/">
                <h5 id="landing-logo">copyzilla</h5>
            </a>
            <a href="/auth/login">Bejelentkezés</a>
        </div>
    )
}

export default Header;