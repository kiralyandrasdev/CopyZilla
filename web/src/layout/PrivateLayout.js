import { getAuth } from "firebase/auth";
import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import './PrivateLayout.css';
import PrivateHeader from "./header/PrivateHeader";
import Sidebar from "./sidebar/Sidebar";

export default function PrivateLayout() {
  const navigate = useNavigate();

  useEffect(() => {
    const auth = getAuth();

    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        console.log("Signed out");
        navigate("/auth/login");
      }
    });

    return unsubscribe;
  }, []);

  return (
    <div className="layout__private">
      <Sidebar></Sidebar>
      <div className="layout__private__main__area">
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