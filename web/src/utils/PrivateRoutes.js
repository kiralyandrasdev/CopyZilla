import React, { useContext, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../features";

const PrivateRoutes = (props) => {
  const { isLoggedIn } = useContext(AuthContext);

  return (
    isLoggedIn ? <Outlet /> : <Navigate to="/auth/login" />
  );
}

export default PrivateRoutes;