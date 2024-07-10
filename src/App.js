import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';

import Navbar from './Components/Navbar/Navbar';
import Topbar from './Components/TopBar/Topbar';
import Footer from './Components/Footer/Footer';

import Engineers from "./Pages/Engineers";
import SupervisingEngineers from "./Pages/SupervisingEngineers";
import Trainings from "./Pages/Trainings";
import Reports from "./Pages/Reports";
import Evaluations from "./Pages/Evaluations";
import Home from "./Pages/Home";
import Summary from './Pages/Summary';

import MainLoginPage from './LoginSignin/MainLoginPage';
import RoleSelectionPage from './LoginSignin/RoleSelectionPage';
import HRLoginPage from './LoginSignin/HRLoginPage';
import EngineersLoginPage from './LoginSignin/EngineersLoginPage';
import SupervisingEngineersLoginPage from './LoginSignin/SupervisingEngineersLoginPage';

const Layout = ({ children }) => {
  const location = useLocation();
  const hideNavbarAndTopbar = [
    "/", 
    "/login", 
    "/login/hr", 
    "/login/engineers", 
    "/login/supervising-engineers"
  ].includes(location.pathname);

  return (
    <>
      {!hideNavbarAndTopbar && <Topbar />}
      {!hideNavbarAndTopbar && <Navbar />}
      {children}
      <Footer />
    </>
  );
};

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Layout>
          <Routes>

            <Route path='/home' element={<Home />} />
            <Route path='/engineers' element={<Engineers />} />
            <Route path='/supervisingengineers' element={<SupervisingEngineers />} />
            <Route path='/trainings' element={<Trainings />} />
            <Route path='/evaluations' element={<Evaluations />} />
            <Route path='/summary' element={<Summary />} />
            <Route path="/" element={<MainLoginPage />} />
            <Route path="/login" element={<RoleSelectionPage />} />
            <Route path="/login/hr" element={<HRLoginPage />} />
            <Route path="/login/engineers" element={<EngineersLoginPage />} />
            <Route path="/login/supervising-engineers" element={<SupervisingEngineersLoginPage />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </div>
  );
}

export default App;
