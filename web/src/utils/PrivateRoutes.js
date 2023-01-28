import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoutes = () => {
  const { accessToken, emailVerified } = useSelector((state) => state.auth);

  const allowed = accessToken && emailVerified;

  return (
    allowed ? <Outlet /> : <Navigate to="/auth/login" />
  );
}

export default PrivateRoutes;