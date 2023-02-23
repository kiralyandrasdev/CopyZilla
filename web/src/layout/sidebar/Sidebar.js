import React from "react";
import { logout } from "../../features/authentication/actions/authActions";
import './Sidebar.css';
import SidebarNavItem from "./nav/SidebarNavItem";

export default function Sidebar() {
    const handleSignOut = async () => {
        await logout();
    }

    const handleHeaderClick = () => {
        window.location.href = "/";
    }

    return (
        <div className="sidebar">
            <div className="header__top">
                <div className="sidebar__header">
                    <h5 onClick={() => handleHeaderClick()}>copyzilla</h5>
                </div>
                <div className="sidebar__main__nav">
                    <SidebarNavItem textColor="var(--grey4)" color="var(--green)" path="/user/home" active={true} text="Email Assistant"></SidebarNavItem>
                    {/* <SidebarNavItem text="Mentések" path="/user/savedResults"></SidebarNavItem> */}
                </div>
            </div>
            <div className="sidebar__bottom_nav">
                <a onClick={() => handleSignOut()}>Kijelentkezés</a>
            </div>
        </div>
    );
}