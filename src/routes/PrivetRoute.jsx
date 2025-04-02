import React from "react";
import useAuthContext from "../CustomHooks/useAuthContext/useAuthContext";
import Loading from "../components/shared/Loading/Loading";
import { Navigate } from "react-router";
import { useLocation } from "react-router";

const PrivetRoute = ({ children }) => {
  const { user, isUserLoading } = useAuthContext();
  const location = useLocation();

  if (isUserLoading) return <Loading />;

  if (user) return children;

  return <Navigate state={location?.pathname} to={"/"} replace={true} />;
};

export default PrivetRoute;
