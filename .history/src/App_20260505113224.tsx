import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from "./pages/user/LandingPage";
import LoginModal from "./components/LoginModal";
import SignupModal from "./components/SignupModal";
import Dashboard from "./pages/user/Dashboard";
import AdminDashboard from "./pages/admin/AdminDashboard";
import { AlertProvider } from './context/AlertProvider';
import { type ReactNode } from "react";
import {NotificationProvider} from "./context/NotificationProvider"

type Props = {
  children: ReactNode;
};

/* =========================
   USER PROTECTED ROUTE
========================= */
const UserProtectedRoute = ({ children }: Props) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

/* =========================
   ADMIN PROTECTED ROUTE
========================= */
const AdminProtectedRoute = ({ children }: Props) => {
  const user = localStorage.getItem("user");

  if (!user) {
    return <Navigate to="/dashboard" replace />;
  }

  try {
    const parsedUser = JSON.parse(user);

    if (parsedUser.role !== "admin") {
      return <Navigate to="/dashboard" replace />;
    }

    return <>{children}</>;
  } catch (err) {
    // invalid JSON safety
    localStorage.removeItem("user");
    return <Navigate to="/" replace />;
  }
};

function App() {
  return (
    <NotificationProvider>

    <AlertProvider>
      <BrowserRouter>
        <LoginModal />
        <SignupModal />

        <Routes>
          {/* Public */}
          <Route path="/" element={<LandingPage />} />

          {/* User Dashboard */}
          <Route
            path="/dashboard"
            element={
              <UserProtectedRoute>
                <Dashboard />
              </UserProtectedRoute>
            }
          />

          {/* Admin Dashboard */}
          <Route
            path="/admin"
            element={
              <AdminProtectedRoute>
                <AdminDashboard />
              </AdminProtectedRoute>
            }
          />

          {/* fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AlertProvider>
    </NotificationProvider>
  );
}

export default App;