import React from 'react';
import './Header.css';

function Header(props) {
    return (
        <div className="nav">
            <a href="/auth/login">Bejelentkezés</a>
        </div>
    )
}

export default Header;