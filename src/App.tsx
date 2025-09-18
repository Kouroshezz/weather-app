
import './App.css';
import { Route, Routes } from 'react-router';
import Dashboard from './Pages/dashboard';
import LandingPage from './Pages/landing';


function App() {



  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </>
  )
}
export default App
