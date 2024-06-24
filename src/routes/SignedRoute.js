import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

const SignedRoute = ({ element }) => {
  const { currentUser } = useContext(AuthContext);
  return currentUser ? <Navigate to="/" /> : element;
};

export default SignedRoute;
