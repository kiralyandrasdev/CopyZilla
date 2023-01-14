import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { LoadingIndicator } from "../components";
import { useGetUserQuery } from "../features/api/apiSlice";
import { getUser } from "../features/user/actions/userActions";
import Footer from "./footer/Footer";
import Header from "./header/Header";

export default function Layout() {
  const { firebaseUid } = useSelector((state) => state.auth);

  // const { data, error, isLoading, isFetching, isSuccess } = useGetUserQuery({ firebaseUid: firebaseUid });

  // const { user, isLoading, error } = useSelector(state => state.user);
  const {
    data: user,
    error,
    isLoading,
    isFetching,
    isSuccess,
  } = useGetUserQuery({ firebaseUid });

  const dispatch = useDispatch();

  useEffect(() => {
    // console.log("dispatch  getUser...");
    // dispatch(getUser(firebaseUid));
  }, []);

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