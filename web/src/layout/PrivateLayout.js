import React from "react";
import { Outlet } from "react-router-dom";
import './PrivateLayout.css';
import PrivateHeader from "./header/PrivateHeader";
import Sidebar from "./sidebar/Sidebar";

export default function PrivateLayout() {
  return (
    <div className="privateLayout">
      <Sidebar></Sidebar>
      <div className="privateLayout__main__area">
        <PrivateHeader></PrivateHeader>
        <main>
          <Outlet></Outlet>
        </main>
        {/*  <footer>
          2023 © CopyZilla
        </footer> */}
      </div>
    </div>
  );
}