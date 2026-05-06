import { type ReactNode } from "react";
import { useAuth } from "../../context/AuthContext";
import { Navigate } from "react-router-dom";
import LoadingSpinner from "./LoadingSpinner";

interface ProtectedRouteProps {
  children: ReactNode;
}
export default function ProtectedRoutes({ children }: ProtectedRouteProps) {
  const { user, hydration } = useAuth();

  return !hydration ? (
    <LoadingSpinner />
  ) : !user ? (
    <Navigate
      to="/login"
      replace
    />
  ) : (
    <>{children}</>
  );
}
