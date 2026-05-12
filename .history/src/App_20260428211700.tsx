
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from "./pages/user/LandingPage";
// import AuthGuard from "./guards/AuthGuard";
import LoginModal from "./components/LoginModal"
import SignupModal from "./components/SignupModal";
import Dashboard from "./pages/user/Dashboard"
import { AlertProvider } from './context/AlertContext';
// import AdminGuard from "./guards/AdminGuard";

function App() {


  return (
    <>
    <AlertProvider>
      <BrowserRouter>
      <LoginModal/>
      <SignupModal/>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<Dashboard />} />

        </Routes>
      </BrowserRouter>
    </AlertProvider>
    </>
  )
}

export default App
