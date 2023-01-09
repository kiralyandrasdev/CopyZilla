import React, { useContext } from 'react';
import { AuthContext } from '../../features';

function Header(props) {
    const { isLoggedIn } = useContext(AuthContext);

    if (isLoggedIn && props.id == "signed-in-header") {
        return (
            <div className="header" id="home-header">
                <a href="/">
                    <h5 id="landing-logo">copyzilla</h5>
                </a>
                <div className="header-nav-menu">
                    <a>Fiók</a>
                    <a href="/auth/login">Kijelentkezés</a>
                </div>
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