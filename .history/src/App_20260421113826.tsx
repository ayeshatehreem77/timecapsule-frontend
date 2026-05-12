
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from "./pages/user/LandingPage";
// import AuthGuard from "./guards/AuthGuard";
import LoginModal from "./components/LoginModal"
import SignupModal from "./components/SignupModal"
// import AdminGuard from "./guards/AdminGuard";

function App() {


  return (
    <>
      <BrowserRouter>
      <LoginModal/>
      <SignupModal/>
        <Routes>
          <Route path="/" element={<LandingPage />} />

        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
