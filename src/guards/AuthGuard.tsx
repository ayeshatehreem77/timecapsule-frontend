import { Navigate } from "react-router-dom";

export default function AuthGuard({ children }: any) {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" />;
  }

  return children;
}