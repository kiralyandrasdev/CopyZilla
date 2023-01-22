import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "./footer/Footer";
import Header from "./header/Header";

export default function PublicLayout() {
    return (
        <body>
            <Header></Header>
            <main>
                <Outlet />
            </main>
            <Footer></Footer>
        </body>
    );
}