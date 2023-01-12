import React, { useCallback, useContext, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { LoadingIndicator } from "../components";
import { AuthContext, UserContext } from "../features";
import { getUser } from "../features/user/services/userService";
import Footer from "./footer/Footer";
import Header from "./header/Header";

export default function Layout() {
  const [isLoading, setIsLoading] = useState(false);

  const { user, updateUser } = useContext(UserContext);
  const { accessToken, firebaseUid } = useContext(AuthContext);

  const [error, setError] = useState(null);
  const isError = error != null;

  const updateError = (value) => {
    setError(value);
  }

  const loadUserData = async () => {
    setIsLoading(true);
    if (accessToken == null) return;
    if (user.id) {
      console.log("user already loaded")
      setIsLoading(false);
      return;
    }
    console.log("user not loaded")
    await getUser(accessToken, firebaseUid)
      .then((user) => {
        updateUser(user);
      })
      .catch((err) => {
        console.log(err);
        updateError(err);
      });
    setIsLoading(false);
  }

  useEffect(() => {
    async function fetchData() {
      await loadUserData();
    }
    fetchData();
  }, [accessToken]);

  const layoutContent = useCallback(() => {
    if (isError) {
      return (
        <div style={{ 'margin': 'auto' }}>
          <h2>Váratlan hiba történt.</h2>
        </div>
      );
    }

    if (isLoading) {
      return (
        <LoadingIndicator cssOverride={{ 'margin': 'auto' }} />
      )
    }

    return (<Outlet />);
  }, [isError, isLoading]);

  return (
    <div className="layout" id="signed-in-layout">
      <Header id="signed-in-header"></Header>
      <div className="layout-content" id="signed-in-layout-content">
        {layoutContent()}
      </div>
      <Footer id="signed-in-header"></Footer>
    </div>
  );
}