// TODO: build the PublicRoute guard here — follow the auth demo from class.

import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

export default function PublicRoute() {
  const token = useAuthStore((state) => state.token);

  if (token) {
    return <Navigate to="/profile" replace />;
  }

  return <Outlet />;
}
