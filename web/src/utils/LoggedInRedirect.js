import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../features";

const LoggedInRedirect = (props) => {
  const { isLoggedIn } = useContext(AuthContext);

  return (
    isLoggedIn === true ? <Navigate to="/user/editor" /> : <Outlet />
  );
}

export default LoggedInRedirect;