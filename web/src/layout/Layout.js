import React, { useCallback, useContext, useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { LoadingIndicator } from "../components";
import { UserContext } from "../features";
import { useGetUserQuery } from "../features/api/apiSlice";
import Footer from "./footer/Footer";
import Header from "./header/Header";

export default function Layout() {
  const { firebaseUid } = useSelector((state) => state.auth);
  const { user, updateUser } = useContext(UserContext);

  const {
    data,
    error,
    isLoading,
    isFetching,
    isSuccess,
  } = useGetUserQuery({ firebaseUid });

  useEffect(() => {
    if (data) {
      updateUser(data);
    }
  }, [data]);

  const layoutContent = useCallback(() => {
    if (error) {
      console.log(error);
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
  }, [error, isLoading]);

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