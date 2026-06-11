import { Navigate, Outlet } from "react-router-dom";

export default function AdminProtectedRoute() {
  const token = localStorage.getItem("adminToken");

  // ❌ not logged in
  if (!token) {
    return <Navigate to="/admin/login" replace />;
  }

  // ✅ logged in
  return <Outlet />;
}
