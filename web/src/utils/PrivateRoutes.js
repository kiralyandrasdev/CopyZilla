import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoutes = () => {
  const { accessToken } = useSelector((state) => state.auth);

  return (
    accessToken ? <Outlet /> : <Navigate to="/auth/login" />
  );
}

export default PrivateRoutes;