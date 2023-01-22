import React from "react";
import { FiPlus, FiPlusSquare } from "react-icons/fi";
import { HiOutlineClock } from "react-icons/hi";
import './Sidebar.css';
import SidebarNavItem from "./nav/SidebarNavItem";

export default function Sidebar() {
    return (
        <div className="sidebar">
            <div className="header__top">
                <div className="sidebar__header">
                    <h4>copyzilla</h4>
                </div>
                <div className="sidebar__main__nav">
                    <SidebarNavItem textColor="var(--grey4)" color="var(--green)" path="/user/editor" active={true} text="Létrehozás"></SidebarNavItem>
                    <SidebarNavItem text="Mentések" path="/user/savedResults"></SidebarNavItem>
                </div>
            </div>
            <div className="sidebar__bottom_nav">
                <a>Kijelentkezés</a>
            </div>
        </div>
    );
}