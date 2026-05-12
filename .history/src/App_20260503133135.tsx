
import './App.css'
// import type { ReactNode } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from "./pages/user/LandingPage";
// import AuthGuard from "./guards/AuthGuard";
import LoginModal from "./components/LoginModal"
import SignupModal from "./components/SignupModal";
import Dashboard from "./pages/user/Dashboard"
import { AlertProvider } from './context/AlertProvider';
import AdminDashboard from "./pages/admin/AdminDashboard"
// import AdminGuard from "./guards/AdminGuard";

function App() {
  const AdminProtectedRoute = ({ children }: { children: React.ReactElement }) => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    if (user.role !== 'admin') {
      return <Navigate to="/admin" replace />;
    }

    return children;
  };


  return (
    <>
      <AlertProvider>
        <BrowserRouter>
          <LoginModal />
          <SignupModal />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/dashboard" element={<Dashboard />} />

            <Route path="/admin" element={
              <AdminProtectedRoute>
                <AdminDashboard />
              </AdminProtectedRoute>
            } />
          </Routes>
        </BrowserRouter>
      </AlertProvider>
    </>
  )
}

export default App
