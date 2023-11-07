import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";

export const IsAdmin = () => {
  const {user } = useAuth();

  if (user.rol != 271) return <Navigate to="/" replace />;

  return <Outlet />;
};