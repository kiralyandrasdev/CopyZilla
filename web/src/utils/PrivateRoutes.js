import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoutes = (props) => {
  let isLoggedIn = false;

  return (
    isLoggedIn ? <Outlet /> : <Navigate to="/auth/login" />
  );
}

export default PrivateRoutes;