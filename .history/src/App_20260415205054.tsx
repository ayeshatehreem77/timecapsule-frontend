
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from "./pages/user/LandingPage";
import Login from "./pages/user/Login";
import AuthGuard from "./guards/AuthGuard";
// import AdminGuard from "./guards/AdminGuard";

function App() {
  

  return (
    <>
    <BrowserRouter>
    <Routes>
      {/* User Routes */}
      <Route path="/" element={
        // <AuthGuard>
        <LandingPage />
        // </AuthGuard>
        } />
      <Route path="/login" element={
        <AuthGuard>
        <Login />
        </AuthGuard>
        } />
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
