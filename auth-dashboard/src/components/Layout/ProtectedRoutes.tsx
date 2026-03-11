import React, { type ReactNode } from "react";
import { useAuth } from "../../context/AuthContext";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: ReactNode;
}
export default function ProtectedRoutes({ children }: ProtectedRouteProps) {
  const { user } = useAuth();

  return !user ? (
    <Navigate
      to="/login"
      replace
    />
  ) : (
    <>{children}</>
  );
}
