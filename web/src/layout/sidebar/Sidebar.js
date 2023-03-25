import React, { useEffect } from "react";
import { logout } from "../../features/authentication/actions/authActions";
import './Sidebar.css';
import SidebarNavItem from "./nav/SidebarNavItem";
import Logo128TrFl from "../../assets/logo/LOGO_TRANS_FULL_tr_fl_128.png";
import { useNavigate } from "react-router-dom";

export default function Sidebar() {
    const handleSignOut = async () => {
        await logout();
    }

    const navigate = useNavigate();

    return (
        <div className="sidebar">
            <div className="header__top">
                <div className="sidebar__header header__public__logo" onClick={() => navigate("/")}>
                    {/* <img src={Logo128} alt="" className="logo" /> */}
                    <img src={Logo128TrFl} alt="" className="logo_tr" />
                    <h5 className="white header__nav__row__item">copy<span className="green">zilla</span></h5>
                </div>
                <div className="sidebar__main__nav">
                    <SidebarNavItem path="/user/emailTemplates" text="📒 Email Templates"></SidebarNavItem>
                </div>
            </div>
            <div className="sidebar__bottom_nav">
                <a onClick={() => handleSignOut()}>Sign out</a>
            </div>
        </div>
    );
}