import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";

function Layout(props) {
  return (
    <div className="layout" id="fixed-layout">
      <Header id={props.headerId}></Header>
      <div id="layout-content">
        <Outlet />
      </div>
      <Footer id={props.footerId}></Footer>
    </div>
  );
}

export default Layout;