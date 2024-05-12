import { Navigate } from "react-router-dom";
import Layout from "../Layout";
import { getToken } from "./getToken";
// import { useEffect, useState } from "react";

const PrivateRoutes = () => {

  const token=getToken();


  return token ? <Layout /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
