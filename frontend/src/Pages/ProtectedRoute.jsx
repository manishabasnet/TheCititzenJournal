import React from 'react';
import Header from "../Components/Header";
import { Navigate } from 'react-router-dom';
import style from "./ProtectedRoute.module.css"

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('access_token');

  if (!token) {
    return <Navigate to="/login" />;
  }
  return (
  <>
  <div className={style.wholepage}>
    <Header/>
    {children}
  </div>
  </>
  );
};

export default ProtectedRoute;
