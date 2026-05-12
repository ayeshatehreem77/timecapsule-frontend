
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from "./pages/user/LandingPage";

function App() {
  

  return (
    <>
    <BrowserRouter>
    <Routes>
      {/* User Routes */}
      <Route path="/" element={<LandingPage />} />
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
