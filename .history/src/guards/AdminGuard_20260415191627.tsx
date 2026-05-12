import { Navigate } from "react-router-dom";

export default function AdminGuard({ children }: any) {
  const role = localStorage.getItem("role");

  if (role !== "admin") {
    return <Navigate to="/" />;
  }

  return children;
}