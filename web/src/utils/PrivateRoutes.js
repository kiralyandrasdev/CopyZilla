import React, { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoutes = (props) => {
  const { accessToken } = useSelector((state) => state.auth);

  useEffect(() => {
    console.log("accesstoken changed: ", accessToken)
  }, [accessToken]);

  return (
    "asd" ? <Outlet /> : <Navigate to="/auth/login" />
  );
}

export default PrivateRoutes;