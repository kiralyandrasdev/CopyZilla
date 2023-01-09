import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "./footer/Footer";
import Header from "./header/Header";

export default function Layout() {
  return (
    <div className="layout" id="signed-in-layout">
      <Header id="signed-in-header"></Header>
      <div className="layout-content" id="signed-in-layout-content">
        <Outlet />
      </div>
      <Footer id="signed-in-header"></Footer>
    </div>
  );
}