import React from "react";
import { Outlet } from "react-router-dom";
import './PrivateLayout.css';
import PrivateHeader from "./header/PrivateHeader";
import Sidebar from "./sidebar/Sidebar";

export default function PrivateLayout() {
  return (
    <div className="layout__private">
      <Sidebar></Sidebar>
      <div className="layout__private__main__area">
        <PrivateHeader></PrivateHeader>
        <main>
          <Outlet></Outlet>
        </main>
      </div>
    </div>
  );
}